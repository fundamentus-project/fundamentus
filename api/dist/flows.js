import * as sharedExceptions from '@directus/exceptions';
import { Action } from '@directus/constants';
import { applyOptionsData, isValidJSON, parseJSON, toArray } from '@directus/utils';
import fastRedact from 'fast-redact';
import { omit, pick } from 'lodash-es';
import { get } from 'micromustache';
import { schedule, validate } from 'node-cron';
import getDatabase from './database/index.js';
import emitter from './emitter.js';
import env from './env.js';
import * as exceptions from './exceptions/index.js';
import { BaseException } from '@directus/exceptions';
import logger from './logger.js';
import { getMessenger } from './messenger.js';
import { ActivityService } from './services/activity.js';
import * as services from './services/index.js';
import { FlowsService } from './services/flows.js';
import { RevisionsService } from './services/revisions.js';
import { constructFlowTree } from './utils/construct-flow-tree.js';
import { getSchema } from './utils/get-schema.js';
import { JobQueue } from './utils/job-queue.js';
import { mapValuesDeep } from './utils/map-values-deep.js';
let flowManager;
const redactLogs = fastRedact({
    censor: '--redacted--',
    paths: ['*.headers.authorization', '*.access_token', '*.headers.cookie'],
    serialize: false,
});
export function getFlowManager() {
    if (flowManager) {
        return flowManager;
    }
    flowManager = new FlowManager();
    return flowManager;
}
const TRIGGER_KEY = '$trigger';
const ACCOUNTABILITY_KEY = '$accountability';
const LAST_KEY = '$last';
const ENV_KEY = '$env';
class FlowManager {
    isLoaded = false;
    operations = {};
    triggerHandlers = [];
    operationFlowHandlers = {};
    webhookFlowHandlers = {};
    reloadQueue;
    constructor() {
        this.reloadQueue = new JobQueue();
        const messenger = getMessenger();
        messenger.subscribe('flows', (event) => {
            if (event['type'] === 'reload') {
                this.reloadQueue.enqueue(async () => {
                    if (this.isLoaded) {
                        await this.unload();
                        await this.load();
                    }
                    else {
                        logger.warn('Flows have to be loaded before they can be reloaded');
                    }
                });
            }
        });
    }
    async initialize() {
        if (!this.isLoaded) {
            await this.load();
        }
    }
    async reload() {
        const messenger = getMessenger();
        messenger.publish('flows', { type: 'reload' });
    }
    addOperation(id, operation) {
        this.operations[id] = operation;
    }
    clearOperations() {
        this.operations = {};
    }
    async runOperationFlow(id, data, context) {
        if (!(id in this.operationFlowHandlers)) {
            logger.warn(`Couldn't find operation triggered flow with id "${id}"`);
            return null;
        }
        const handler = this.operationFlowHandlers[id];
        return handler(data, context);
    }
    async runWebhookFlow(id, data, context) {
        if (!(id in this.webhookFlowHandlers)) {
            logger.warn(`Couldn't find webhook or manual triggered flow with id "${id}"`);
            throw new exceptions.ForbiddenException();
        }
        const handler = this.webhookFlowHandlers[id];
        return handler(data, context);
    }
    async load() {
        const flowsService = new FlowsService({ knex: getDatabase(), schema: await getSchema() });
        const flows = await flowsService.readByQuery({
            filter: { status: { _eq: 'active' } },
            fields: ['*', 'operations.*'],
            limit: -1,
        });
        const flowTrees = flows.map((flow) => constructFlowTree(flow));
        for (const flow of flowTrees) {
            if (flow.trigger === 'event') {
                let events = [];
                if (flow.options?.['scope']) {
                    events = toArray(flow.options['scope'])
                        .map((scope) => {
                        if (['items.create', 'items.update', 'items.delete'].includes(scope)) {
                            if (!flow.options?.['collections'])
                                return [];
                            return toArray(flow.options['collections']).map((collection) => {
                                if (collection.startsWith('directus_')) {
                                    const action = scope.split('.')[1];
                                    return collection.substring(9) + '.' + action;
                                }
                                return `${collection}.${scope}`;
                            });
                        }
                        return scope;
                    })
                        .flat();
                }
                if (flow.options['type'] === 'filter') {
                    const handler = (payload, meta, context) => this.executeFlow(flow, { payload, ...meta }, {
                        accountability: context['accountability'],
                        database: context['database'],
                        getSchema: context['schema'] ? () => context['schema'] : getSchema,
                    });
                    events.forEach((event) => emitter.onFilter(event, handler));
                    this.triggerHandlers.push({
                        id: flow.id,
                        events: events.map((event) => ({ type: 'filter', name: event, handler })),
                    });
                }
                else if (flow.options['type'] === 'action') {
                    const handler = (meta, context) => this.executeFlow(flow, meta, {
                        accountability: context['accountability'],
                        database: getDatabase(),
                        getSchema: context['schema'] ? () => context['schema'] : getSchema,
                    });
                    events.forEach((event) => emitter.onAction(event, handler));
                    this.triggerHandlers.push({
                        id: flow.id,
                        events: events.map((event) => ({ type: 'action', name: event, handler })),
                    });
                }
            }
            else if (flow.trigger === 'schedule') {
                if (validate(flow.options['cron'])) {
                    const task = schedule(flow.options['cron'], async () => {
                        try {
                            await this.executeFlow(flow);
                        }
                        catch (error) {
                            logger.error(error);
                        }
                    });
                    this.triggerHandlers.push({ id: flow.id, events: [{ type: flow.trigger, task }] });
                }
                else {
                    logger.warn(`Couldn't register cron trigger. Provided cron is invalid: ${flow.options['cron']}`);
                }
            }
            else if (flow.trigger === 'operation') {
                const handler = (data, context) => this.executeFlow(flow, data, context);
                this.operationFlowHandlers[flow.id] = handler;
            }
            else if (flow.trigger === 'webhook') {
                const handler = (data, context) => {
                    if (flow.options['async']) {
                        this.executeFlow(flow, data, context);
                        return undefined;
                    }
                    else {
                        return this.executeFlow(flow, data, context);
                    }
                };
                const method = flow.options?.['method'] ?? 'GET';
                // Default return to $last for webhooks
                flow.options['return'] = flow.options['return'] ?? '$last';
                this.webhookFlowHandlers[`${method}-${flow.id}`] = handler;
            }
            else if (flow.trigger === 'manual') {
                const handler = (data, context) => {
                    const enabledCollections = flow.options?.['collections'] ?? [];
                    const targetCollection = data?.['body'].collection;
                    if (!targetCollection) {
                        logger.warn(`Manual trigger requires "collection" to be specified in the payload`);
                        throw new exceptions.ForbiddenException();
                    }
                    if (enabledCollections.length === 0) {
                        logger.warn(`There is no collections configured for this manual trigger`);
                        throw new exceptions.ForbiddenException();
                    }
                    if (!enabledCollections.includes(targetCollection)) {
                        logger.warn(`Specified collection must be one of: ${enabledCollections.join(', ')}.`);
                        throw new exceptions.ForbiddenException();
                    }
                    if (flow.options['async']) {
                        this.executeFlow(flow, data, context);
                        return undefined;
                    }
                    else {
                        return this.executeFlow(flow, data, context);
                    }
                };
                // Default return to $last for manual
                flow.options['return'] = '$last';
                this.webhookFlowHandlers[`POST-${flow.id}`] = handler;
            }
        }
        this.isLoaded = true;
    }
    async unload() {
        for (const trigger of this.triggerHandlers) {
            trigger.events.forEach((event) => {
                switch (event.type) {
                    case 'filter':
                        emitter.offFilter(event.name, event.handler);
                        break;
                    case 'action':
                        emitter.offAction(event.name, event.handler);
                        break;
                    case 'schedule':
                        event.task.stop();
                        break;
                }
            });
        }
        this.triggerHandlers = [];
        this.operationFlowHandlers = {};
        this.webhookFlowHandlers = {};
        this.isLoaded = false;
    }
    async executeFlow(flow, data = null, context = {}) {
        const database = context['database'] ?? getDatabase();
        const schema = context['schema'] ?? (await getSchema({ database }));
        const keyedData = {
            [TRIGGER_KEY]: data,
            [LAST_KEY]: data,
            [ACCOUNTABILITY_KEY]: context?.['accountability'] ?? null,
            [ENV_KEY]: pick(env, env['FLOWS_ENV_ALLOW_LIST'] ? toArray(env['FLOWS_ENV_ALLOW_LIST']) : []),
        };
        let nextOperation = flow.operation;
        let lastOperationStatus = 'unknown';
        const steps = [];
        while (nextOperation !== null) {
            const { successor, data, status, options } = await this.executeOperation(nextOperation, keyedData, context);
            keyedData[nextOperation.key] = data;
            keyedData[LAST_KEY] = data;
            lastOperationStatus = status;
            steps.push({ operation: nextOperation.id, key: nextOperation.key, status, options });
            nextOperation = successor;
        }
        if (flow.accountability !== null) {
            const activityService = new ActivityService({
                knex: database,
                schema: schema,
            });
            const accountability = context?.['accountability'];
            const activity = await activityService.createOne({
                action: Action.RUN,
                user: accountability?.user ?? null,
                collection: 'directus_flows',
                ip: accountability?.ip ?? null,
                user_agent: accountability?.userAgent ?? null,
                origin: accountability?.origin ?? null,
                item: flow.id,
            });
            if (flow.accountability === 'all') {
                const revisionsService = new RevisionsService({
                    knex: database,
                    schema: schema,
                });
                await revisionsService.createOne({
                    activity: activity,
                    collection: 'directus_flows',
                    item: flow.id,
                    data: {
                        steps: steps,
                        data: redactLogs(omit(keyedData, '$accountability.permissions')), // Permissions is a ton of data, and is just a copy of what's in the directus_permissions table
                    },
                });
            }
        }
        if (flow.trigger === 'event' && flow.options['type'] === 'filter' && lastOperationStatus === 'reject') {
            throw keyedData[LAST_KEY];
        }
        if (flow.options['return'] === '$all') {
            return keyedData;
        }
        else if (flow.options['return']) {
            return get(keyedData, flow.options['return']);
        }
        return undefined;
    }
    async executeOperation(operation, keyedData, context = {}) {
        if (!(operation.type in this.operations)) {
            logger.warn(`Couldn't find operation ${operation.type}`);
            return { successor: null, status: 'unknown', data: null, options: null };
        }
        const handler = this.operations[operation.type];
        const options = applyOptionsData(operation.options, keyedData);
        try {
            let result = await handler(options, {
                services,
                exceptions: { ...exceptions, ...sharedExceptions },
                env,
                database: getDatabase(),
                logger,
                getSchema,
                data: keyedData,
                accountability: null,
                ...context,
            });
            // Validate that the operations result is serializable and thus catching the error inside the flow execution
            JSON.stringify(result ?? null);
            // JSON structures don't allow for undefined values, so we need to replace them with null
            // Otherwise the applyOptionsData function will not work correctly on the next operation
            if (typeof result === 'object' && result !== null) {
                result = mapValuesDeep(result, (_, value) => (value === undefined ? null : value));
            }
            return { successor: operation.resolve, status: 'resolve', data: result ?? null, options };
        }
        catch (error) {
            let data;
            if (error instanceof BaseException) {
                data = { message: error.message, code: error.code, extensions: error.extensions, status: error.status };
            }
            else if (error instanceof Error) {
                data = { message: error.message };
            }
            else if (typeof error === 'string') {
                // If the error is a JSON string, parse it and use that as the error data
                data = isValidJSON(error) ? parseJSON(error) : error;
            }
            else {
                // If error is plain object, use this as the error data and otherwise fallback to null
                data = error ?? null;
            }
            return {
                successor: operation.reject,
                status: 'reject',
                data,
                options,
            };
        }
    }
}

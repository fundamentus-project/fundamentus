import ee2 from 'eventemitter2';
import logger from './logger.js';
export class Emitter {
    filterEmitter;
    actionEmitter;
    initEmitter;
    constructor() {
        const emitterOptions = {
            wildcard: true,
            verboseMemoryLeak: true,
            delimiter: '.',
            // This will ignore the "unspecified event" error
            ignoreErrors: true,
        };
        this.filterEmitter = new ee2.EventEmitter2(emitterOptions);
        this.actionEmitter = new ee2.EventEmitter2(emitterOptions);
        this.initEmitter = new ee2.EventEmitter2(emitterOptions);
    }
    async emitFilter(event, payload, meta, context) {
        const events = Array.isArray(event) ? event : [event];
        const eventListeners = events.map((event) => ({
            event,
            listeners: this.filterEmitter.listeners(event),
        }));
        let updatedPayload = payload;
        for (const { event, listeners } of eventListeners) {
            for (const listener of listeners) {
                const result = await listener(updatedPayload, { event, ...meta }, context);
                if (result !== undefined) {
                    updatedPayload = result;
                }
            }
        }
        return updatedPayload;
    }
    emitAction(event, meta, context) {
        const events = Array.isArray(event) ? event : [event];
        for (const event of events) {
            this.actionEmitter.emitAsync(event, { event, ...meta }, context).catch((err) => {
                logger.warn(`An error was thrown while executing action "${event}"`);
                logger.warn(err);
            });
        }
    }
    async emitInit(event, meta) {
        try {
            await this.initEmitter.emitAsync(event, { event, ...meta });
        }
        catch (err) {
            logger.warn(`An error was thrown while executing init "${event}"`);
            logger.warn(err);
        }
    }
    onFilter(event, handler) {
        this.filterEmitter.on(event, handler);
    }
    onAction(event, handler) {
        this.actionEmitter.on(event, handler);
    }
    onInit(event, handler) {
        this.initEmitter.on(event, handler);
    }
    offFilter(event, handler) {
        this.filterEmitter.off(event, handler);
    }
    offAction(event, handler) {
        this.actionEmitter.off(event, handler);
    }
    offInit(event, handler) {
        this.initEmitter.off(event, handler);
    }
    offAll() {
        this.filterEmitter.removeAllListeners();
        this.actionEmitter.removeAllListeners();
        this.initEmitter.removeAllListeners();
    }
}
const emitter = new Emitter();
export default emitter;

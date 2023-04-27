import { clearSystemCache, getCache } from '../cache.js';
import { appAccessMinimalPermissions } from '../database/system-data/app-access-permissions/index.js';
import { ItemsService } from '../services/items.js';
import { filterItems } from '../utils/filter-items.js';
export class PermissionsService extends ItemsService {
    systemCache;
    constructor(options) {
        super('directus_permissions', options);
        const { systemCache } = getCache();
        this.systemCache = systemCache;
    }
    getAllowedFields(action, collection) {
        const results = this.accountability?.permissions?.filter((permission) => {
            let matchesCollection = true;
            if (collection) {
                matchesCollection = permission.collection === collection;
            }
            const matchesAction = permission.action === action;
            return collection ? matchesCollection && matchesAction : matchesAction;
        }) ?? [];
        const fieldsPerCollection = {};
        for (const result of results) {
            const { collection, fields } = result;
            if (!fieldsPerCollection[collection])
                fieldsPerCollection[collection] = [];
            fieldsPerCollection[collection].push(...(fields ?? []));
        }
        return fieldsPerCollection;
    }
    async readByQuery(query, opts) {
        const result = await super.readByQuery(query, opts);
        if (Array.isArray(result) && this.accountability && this.accountability.app === true) {
            result.push(...filterItems(appAccessMinimalPermissions.map((permission) => ({
                ...permission,
                role: this.accountability.role,
            })), query.filter));
        }
        return result;
    }
    async readMany(keys, query = {}, opts) {
        const result = await super.readMany(keys, query, opts);
        if (this.accountability && this.accountability.app === true) {
            result.push(...filterItems(appAccessMinimalPermissions.map((permission) => ({
                ...permission,
                role: this.accountability.role,
            })), query.filter));
        }
        return result;
    }
    async createOne(data, opts) {
        const res = await super.createOne(data, opts);
        await clearSystemCache({ autoPurgeCache: opts?.autoPurgeCache });
        return res;
    }
    async createMany(data, opts) {
        const res = await super.createMany(data, opts);
        await clearSystemCache({ autoPurgeCache: opts?.autoPurgeCache });
        return res;
    }
    async updateBatch(data, opts) {
        const res = await super.updateBatch(data, opts);
        await clearSystemCache({ autoPurgeCache: opts?.autoPurgeCache });
        return res;
    }
    async updateMany(keys, data, opts) {
        const res = await super.updateMany(keys, data, opts);
        await clearSystemCache({ autoPurgeCache: opts?.autoPurgeCache });
        return res;
    }
    async upsertMany(payloads, opts) {
        const res = await super.upsertMany(payloads, opts);
        await clearSystemCache({ autoPurgeCache: opts?.autoPurgeCache });
        return res;
    }
    async deleteMany(keys, opts) {
        const res = await super.deleteMany(keys, opts);
        await clearSystemCache({ autoPurgeCache: opts?.autoPurgeCache });
        return res;
    }
}

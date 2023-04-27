import { getFlowManager } from '../flows.js';
import { ItemsService } from './items.js';
export class OperationsService extends ItemsService {
    constructor(options) {
        super('directus_operations', options);
    }
    async createOne(data, opts) {
        const flowManager = getFlowManager();
        const result = await super.createOne(data, opts);
        await flowManager.reload();
        return result;
    }
    async createMany(data, opts) {
        const flowManager = getFlowManager();
        const result = await super.createMany(data, opts);
        await flowManager.reload();
        return result;
    }
    async updateBatch(data, opts) {
        const flowManager = getFlowManager();
        const result = await super.updateBatch(data, opts);
        await flowManager.reload();
        return result;
    }
    async updateMany(keys, data, opts) {
        const flowManager = getFlowManager();
        const result = await super.updateMany(keys, data, opts);
        await flowManager.reload();
        return result;
    }
    async deleteMany(keys, opts) {
        const flowManager = getFlowManager();
        const result = await super.deleteMany(keys, opts);
        await flowManager.reload();
        return result;
    }
}

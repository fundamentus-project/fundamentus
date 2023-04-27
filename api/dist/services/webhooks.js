import { getMessenger } from '../messenger.js';
import { ItemsService } from './items.js';
export class WebhooksService extends ItemsService {
    messenger;
    constructor(options) {
        super('directus_webhooks', options);
        this.messenger = getMessenger();
    }
    async createOne(data, opts) {
        const result = await super.createOne(data, opts);
        this.messenger.publish('webhooks', { type: 'reload' });
        return result;
    }
    async createMany(data, opts) {
        const result = await super.createMany(data, opts);
        this.messenger.publish('webhooks', { type: 'reload' });
        return result;
    }
    async updateMany(keys, data, opts) {
        const result = await super.updateMany(keys, data, opts);
        this.messenger.publish('webhooks', { type: 'reload' });
        return result;
    }
    async deleteMany(keys, opts) {
        const result = await super.deleteMany(keys, opts);
        this.messenger.publish('webhooks', { type: 'reload' });
        return result;
    }
}

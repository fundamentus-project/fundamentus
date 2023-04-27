import { ItemsService } from './items.js';
export class SettingsService extends ItemsService {
    constructor(options) {
        super('directus_settings', options);
    }
}

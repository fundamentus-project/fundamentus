import { ItemsService } from './items.js';
export class PanelsService extends ItemsService {
    constructor(options) {
        super('directus_panels', options);
    }
}

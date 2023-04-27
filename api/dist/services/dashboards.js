import { ItemsService } from './items.js';
export class DashboardsService extends ItemsService {
    constructor(options) {
        super('directus_dashboards', options);
    }
}

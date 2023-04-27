import { ItemsService } from './items.js';
export class FoldersService extends ItemsService {
    constructor(options) {
        super('directus_folders', options);
    }
}

import type { AbstractServiceOptions, PrimaryKey } from '../types/index.js';
import { ItemsService } from './items.js';
export declare class RevisionsService extends ItemsService {
    constructor(options: AbstractServiceOptions);
    revert(pk: PrimaryKey): Promise<void>;
}

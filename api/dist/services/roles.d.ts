import type { Query } from '@directus/types';
import type { AbstractServiceOptions, MutationOptions, PrimaryKey } from '../types/index.js';
import { ItemsService } from './items.js';
export declare class RolesService extends ItemsService {
    constructor(options: AbstractServiceOptions);
    private checkForOtherAdminRoles;
    private checkForOtherAdminUsers;
    updateOne(key: PrimaryKey, data: Record<string, any>, opts?: MutationOptions): Promise<PrimaryKey>;
    updateBatch(data: Record<string, any>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    updateMany(keys: PrimaryKey[], data: Record<string, any>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    deleteOne(key: PrimaryKey): Promise<PrimaryKey>;
    deleteMany(keys: PrimaryKey[]): Promise<PrimaryKey[]>;
    deleteByQuery(query: Query, opts?: MutationOptions): Promise<PrimaryKey[]>;
}

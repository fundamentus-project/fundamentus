import type { PermissionsAction, Query } from '@directus/types';
import type Keyv from 'keyv';
import type { QueryOptions } from '../services/items.js';
import { ItemsService } from '../services/items.js';
import type { AbstractServiceOptions, Item, MutationOptions, PrimaryKey } from '../types/index.js';
export declare class PermissionsService extends ItemsService {
    systemCache: Keyv<any>;
    constructor(options: AbstractServiceOptions);
    getAllowedFields(action: PermissionsAction, collection?: string): Record<string, string[]>;
    readByQuery(query: Query, opts?: QueryOptions): Promise<Partial<Item>[]>;
    readMany(keys: PrimaryKey[], query?: Query, opts?: QueryOptions): Promise<Partial<Item>[]>;
    createOne(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    createMany(data: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    updateBatch(data: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    updateMany(keys: PrimaryKey[], data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    upsertMany(payloads: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    deleteMany(keys: PrimaryKey[], opts?: MutationOptions): Promise<PrimaryKey[]>;
}

import type { Accountability, PermissionsAction, Query, SchemaOverview } from '@directus/types';
import type Keyv from 'keyv';
import type { Knex } from 'knex';
import type { AbstractService, AbstractServiceOptions, Item as AnyItem, MutationOptions, PrimaryKey } from '../types/index.js';
export type QueryOptions = {
    stripNonRequested?: boolean;
    permissionsAction?: PermissionsAction;
    emitEvents?: boolean;
};
export type MutationTracker = {
    trackMutations: (count: number) => void;
    getCount: () => number;
};
export declare class ItemsService<Item extends AnyItem = AnyItem> implements AbstractService {
    collection: string;
    knex: Knex;
    accountability: Accountability | null;
    eventScope: string;
    schema: SchemaOverview;
    cache: Keyv<any> | null;
    constructor(collection: string, options: AbstractServiceOptions);
    createMutationTracker(initialCount?: number): MutationTracker;
    getKeysByQuery(query: Query): Promise<PrimaryKey[]>;
    /**
     * Create a single new item.
     */
    createOne(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Create multiple new items at once. Inserts all provided records sequentially wrapped in a transaction.
     */
    createMany(data: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Get items by query
     */
    readByQuery(query: Query, opts?: QueryOptions): Promise<Item[]>;
    /**
     * Get single item by primary key
     */
    readOne(key: PrimaryKey, query?: Query, opts?: QueryOptions): Promise<Item>;
    /**
     * Get multiple items by primary keys
     */
    readMany(keys: PrimaryKey[], query?: Query, opts?: QueryOptions): Promise<Item[]>;
    /**
     * Update multiple items by query
     */
    updateByQuery(query: Query, data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Update a single item by primary key
     */
    updateOne(key: PrimaryKey, data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Update multiple items in a single transaction
     */
    updateBatch(data: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Update many items by primary key, setting all items to the same change
     */
    updateMany(keys: PrimaryKey[], data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Upsert a single item
     */
    upsertOne(payload: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Upsert many items
     */
    upsertMany(payloads: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Delete multiple items by query
     */
    deleteByQuery(query: Query, opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Delete a single item by primary key
     */
    deleteOne(key: PrimaryKey, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Delete multiple items by primary key
     */
    deleteMany(keys: PrimaryKey[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Read/treat collection as singleton
     */
    readSingleton(query: Query, opts?: QueryOptions): Promise<Partial<Item>>;
    /**
     * Upsert/treat collection as singleton
     */
    upsertSingleton(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
}

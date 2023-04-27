import type { SchemaInspector, Table } from '@directus/schema';
import type { Accountability, RawField, SchemaOverview } from '@directus/types';
import type Keyv from 'keyv';
import type { Knex } from 'knex';
import type { Helpers } from '../database/helpers/index.js';
import type { AbstractServiceOptions, Collection, CollectionMeta, MutationOptions } from '../types/index.js';
export type RawCollection = {
    collection: string;
    fields?: RawField[];
    schema?: Partial<Table> | null;
    meta?: Partial<CollectionMeta> | null;
};
export declare class CollectionsService {
    knex: Knex;
    helpers: Helpers;
    accountability: Accountability | null;
    schemaInspector: SchemaInspector;
    schema: SchemaOverview;
    cache: Keyv<any> | null;
    systemCache: Keyv<any>;
    constructor(options: AbstractServiceOptions);
    /**
     * Create a single new collection
     */
    createOne(payload: RawCollection, opts?: MutationOptions): Promise<string>;
    /**
     * Create multiple new collections
     */
    createMany(payloads: RawCollection[], opts?: MutationOptions): Promise<string[]>;
    /**
     * Read all collections. Currently doesn't support any query.
     */
    readByQuery(): Promise<Collection[]>;
    /**
     * Get a single collection by name
     */
    readOne(collectionKey: string): Promise<Collection>;
    /**
     * Read many collections by name
     */
    readMany(collectionKeys: string[]): Promise<Collection[]>;
    /**
     * Update a single collection by name
     */
    updateOne(collectionKey: string, data: Partial<Collection>, opts?: MutationOptions): Promise<string>;
    /**
     * Update multiple collections in a single transaction
     */
    updateBatch(data: Partial<Collection>[], opts?: MutationOptions): Promise<string[]>;
    /**
     * Update multiple collections by name
     */
    updateMany(collectionKeys: string[], data: Partial<Collection>, opts?: MutationOptions): Promise<string[]>;
    /**
     * Delete a single collection This will delete the table and all records within. It'll also
     * delete any fields, presets, activity, revisions, and permissions relating to this collection
     */
    deleteOne(collectionKey: string, opts?: MutationOptions): Promise<string>;
    /**
     * Delete multiple collections by key
     */
    deleteMany(collectionKeys: string[], opts?: MutationOptions): Promise<string[]>;
}

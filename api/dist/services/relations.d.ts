import type { SchemaInspector } from '@directus/schema';
import type { Accountability, Relation, RelationMeta, SchemaOverview } from '@directus/types';
import type Keyv from 'keyv';
import type { Knex } from 'knex';
import type { Helpers } from '../database/helpers/index.js';
import type { AbstractServiceOptions, MutationOptions } from '../types/index.js';
import type { QueryOptions } from './items.js';
import { ItemsService } from './items.js';
import { PermissionsService } from './permissions.js';
export declare class RelationsService {
    knex: Knex;
    permissionsService: PermissionsService;
    schemaInspector: SchemaInspector;
    accountability: Accountability | null;
    schema: SchemaOverview;
    relationsItemService: ItemsService<RelationMeta>;
    systemCache: Keyv<any>;
    helpers: Helpers;
    constructor(options: AbstractServiceOptions);
    readAll(collection?: string, opts?: QueryOptions): Promise<Relation[]>;
    readOne(collection: string, field: string): Promise<Relation>;
    /**
     * Create a new relationship / foreign key constraint
     */
    createOne(relation: Partial<Relation>, opts?: MutationOptions): Promise<void>;
    /**
     * Update an existing foreign key constraint
     *
     * Note: You can update anything under meta, but only the `on_delete` trigger under schema
     */
    updateOne(collection: string, field: string, relation: Partial<Relation>, opts?: MutationOptions): Promise<void>;
    /**
     * Delete an existing relationship
     */
    deleteOne(collection: string, field: string, opts?: MutationOptions): Promise<void>;
    /**
     * Whether or not the current user has read access to relations
     */
    private get hasReadAccess();
    /**
     * Combine raw schema foreign key information with Directus relations meta rows to form final
     * Relation objects
     */
    private stitchRelations;
    /**
     * Loop over all relations and filter out the ones that contain collections/fields you don't have
     * permissions to
     */
    private filterForbidden;
    /**
     * MySQL Specific
     *
     * MySQL doesn't accept FKs from `int` to `int unsigned`. `knex` defaults `.increments()` to
     * `unsigned`, but defaults regular `int` to `int`. This means that created m2o fields have the
     * wrong type. This step will force the m2o `int` field into `unsigned`, but only if both types are
     * integers, and only if we go from `int` to `int unsigned`.
     *
     * @TODO This is a bit of a hack, and might be better of abstracted elsewhere
     */
    private alterType;
}

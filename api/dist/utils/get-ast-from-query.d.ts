/**
 * Generate an AST based on a given collection and query
 */
import type { Accountability, PermissionsAction, Query, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { AST } from '../types/index.js';
type GetASTOptions = {
    accountability?: Accountability | null;
    action?: PermissionsAction;
    knex?: Knex;
};
export default function getASTFromQuery(collection: string, query: Query, schema: SchemaOverview, options?: GetASTOptions): Promise<AST>;
export {};

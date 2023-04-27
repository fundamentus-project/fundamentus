import type { Item, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { AST, NestedCollectionNode } from '../types/ast.js';
type RunASTOptions = {
    /**
     * Query override for the current level
     */
    query?: AST['query'];
    /**
     * Knex instance
     */
    knex?: Knex;
    /**
     * Whether or not the current execution is a nested dataset in another AST
     */
    nested?: boolean;
    /**
     * Whether or not to strip out non-requested required fields automatically (eg IDs / FKs)
     */
    stripNonRequested?: boolean;
};
/**
 * Execute a given AST using Knex. Returns array of items based on requested AST.
 */
export default function runAST(originalAST: AST | NestedCollectionNode, schema: SchemaOverview, options?: RunASTOptions): Promise<null | Item | Item[]>;
export {};

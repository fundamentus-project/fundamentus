import type { Aggregate, Filter, Query, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { AliasMap } from './get-column-path.js';
export declare const generateAlias: (size?: number | undefined) => string;
/**
 * Apply the Query to a given Knex query builder instance
 */
export default function applyQuery(knex: Knex, collection: string, dbQuery: Knex.QueryBuilder, query: Query, schema: SchemaOverview, options?: {
    aliasMap?: AliasMap;
    isInnerQuery?: boolean;
    hasMultiRelationalSort?: boolean | undefined;
}): {
    query: Knex.QueryBuilder<any, any>;
    hasMultiRelationalFilter: boolean;
};
export type ColumnSortRecord = {
    order: 'asc' | 'desc';
    column: string;
};
export declare function applySort(knex: Knex, schema: SchemaOverview, rootQuery: Knex.QueryBuilder, rootSort: string[], collection: string, aliasMap: AliasMap, returnRecords?: boolean): {
    sortRecords: {
        order: "asc" | "desc";
        column: any;
    }[];
    hasMultiRelationalSort: boolean;
} | undefined;
export declare function applyLimit(knex: Knex, rootQuery: Knex.QueryBuilder, limit: any): void;
export declare function applyOffset(knex: Knex, rootQuery: Knex.QueryBuilder, offset: any): void;
export declare function applyFilter(knex: Knex, schema: SchemaOverview, rootQuery: Knex.QueryBuilder, rootFilter: Filter, collection: string, aliasMap: AliasMap): {
    query: Knex.QueryBuilder<any, any>;
    hasMultiRelationalFilter: boolean;
};
export declare function applySearch(schema: SchemaOverview, dbQuery: Knex.QueryBuilder, searchQuery: string, collection: string): Promise<void>;
export declare function applyAggregate(dbQuery: Knex.QueryBuilder, aggregate: Aggregate, collection: string): void;

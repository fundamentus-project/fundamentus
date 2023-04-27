import type { Relation, SchemaOverview } from '@directus/types';
export type AliasMap = {
    [key: string]: {
        alias: string;
        collection: string;
    };
};
export type ColPathProps = {
    path: string[];
    collection: string;
    aliasMap: AliasMap;
    relations: Relation[];
    schema?: SchemaOverview;
};
export type ColPathResult = {
    columnPath: string;
    targetCollection: string;
    addNestedPkField: string | undefined;
};
/**
 * Converts a Directus field list path to the correct SQL names based on the constructed alias map.
 * For example: ['author', 'role', 'name'] -> 'ljnsv.name'
 * Also returns the target collection of the column: 'directus_roles'
 * If the last filter path is an alias field, a nested PK is appended to the path
 */
export declare function getColumnPath({ path, collection, aliasMap, relations, schema }: ColPathProps): ColPathResult;

import type { Query, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
type GetColumnOptions = {
    query?: Query | undefined;
    originalCollectionName?: string | undefined;
};
/**
 * Return column prefixed by table. If column includes functions (like `year(date_created)`), the
 * column is replaced with the appropriate SQL
 *
 * @param knex Current knex / transaction instance
 * @param table Collection or alias in which column resides
 * @param column name of the column
 * @param alias Whether or not to add a SQL AS statement
 * @param schema For retrieval of the column type
 * @param options Optional parameters
 * @returns Knex raw instance
 */
export declare function getColumn(knex: Knex, table: string, column: string, alias: string | false | undefined, schema: SchemaOverview, options?: GetColumnOptions): Knex.Raw;
export {};

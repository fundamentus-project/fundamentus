import type { Knex } from 'knex';
import { SchemaHelper } from '../types.js';
export declare class SchemaHelperMySQL extends SchemaHelper {
    applyMultiRelationalSort(knex: Knex, dbQuery: Knex.QueryBuilder, table: string, primaryKey: string, orderByString: string, orderByFields: Knex.Raw[]): Knex.QueryBuilder;
}

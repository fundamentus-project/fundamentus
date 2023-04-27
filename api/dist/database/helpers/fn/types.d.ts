import type { Query, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import { DatabaseHelper } from '../types.js';
export type FnHelperOptions = {
    type: string | undefined;
    query: Query | undefined;
    originalCollectionName: string | undefined;
};
export declare abstract class FnHelper extends DatabaseHelper {
    protected schema: SchemaOverview;
    constructor(knex: Knex, schema: SchemaOverview);
    abstract year(table: string, column: string, options?: FnHelperOptions): Knex.Raw;
    abstract month(table: string, column: string, options?: FnHelperOptions): Knex.Raw;
    abstract week(table: string, column: string, options?: FnHelperOptions): Knex.Raw;
    abstract day(table: string, column: string, options?: FnHelperOptions): Knex.Raw;
    abstract weekday(table: string, column: string, options?: FnHelperOptions): Knex.Raw;
    abstract hour(table: string, column: string, options?: FnHelperOptions): Knex.Raw;
    abstract minute(table: string, column: string, options?: FnHelperOptions): Knex.Raw;
    abstract second(table: string, column: string, options?: FnHelperOptions): Knex.Raw;
    abstract count(table: string, column: string, options?: FnHelperOptions): Knex.Raw;
    protected _relationalCount(table: string, column: string, options?: FnHelperOptions): Knex.Raw;
}

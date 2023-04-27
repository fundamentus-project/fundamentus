import type { Knex } from 'knex';
import type { FnHelperOptions } from '../types.js';
import { FnHelper } from '../types.js';
export declare class FnHelperMySQL extends FnHelper {
    year(table: string, column: string): Knex.Raw;
    month(table: string, column: string): Knex.Raw;
    week(table: string, column: string): Knex.Raw;
    day(table: string, column: string): Knex.Raw;
    weekday(table: string, column: string): Knex.Raw;
    hour(table: string, column: string): Knex.Raw;
    minute(table: string, column: string): Knex.Raw;
    second(table: string, column: string): Knex.Raw;
    count(table: string, column: string, options?: FnHelperOptions): Knex.Raw;
}

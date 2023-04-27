import type { Knex } from 'knex';
export declare abstract class DatabaseHelper {
    protected knex: Knex;
    constructor(knex: Knex);
}

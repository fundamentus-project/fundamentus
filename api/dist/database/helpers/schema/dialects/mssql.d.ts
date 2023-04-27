import type { Knex } from 'knex';
import { SchemaHelper } from '../types.js';
export declare class SchemaHelperMSSQL extends SchemaHelper {
    applyLimit(rootQuery: Knex.QueryBuilder, limit: number): void;
    applyOffset(rootQuery: Knex.QueryBuilder, offset: number): void;
    formatUUID(uuid: string): string;
}

import type { Knex } from 'knex';
import type { Column } from '../types/column.js';
import type { ForeignKey } from '../types/foreign-key.js';
import type { SchemaOverview } from '../types/overview.js';
import type { SchemaInspector } from '../types/schema-inspector.js';
import type { Table } from '../types/table.js';
export declare function parseDefaultValue(value: string | null): string | null;
export default class SQLite implements SchemaInspector {
    knex: Knex;
    constructor(knex: Knex);
    overview(): Promise<SchemaOverview>;
    /**
     * List all existing tables in the current schema/database
     */
    tables(): Promise<string[]>;
    /**
     * Get the table info for a given table. If table parameter is undefined, it will return all tables
     * in the current schema/database
     */
    tableInfo(): Promise<Table[]>;
    tableInfo(table: string): Promise<Table>;
    /**
     * Check if a table exists in the current schema/database
     */
    hasTable(table: string): Promise<boolean>;
    /**
     * Get all the available columns in the current schema/database. Can be filtered to a specific table
     */
    columns(table?: string): Promise<{
        table: string;
        column: string;
    }[]>;
    /**
     * Get the column info for all columns, columns in a given table, or a specific column.
     */
    columnInfo(): Promise<Column[]>;
    columnInfo(table: string): Promise<Column[]>;
    columnInfo(table: string, column: string): Promise<Column>;
    /**
     * Check if a table exists in the current schema/database
     */
    hasColumn(table: string, column: string): Promise<boolean>;
    /**
     * Get the primary key column for the given table
     */
    primary(table: string): Promise<string | null>;
    foreignKeys(table?: string): Promise<ForeignKey[]>;
}

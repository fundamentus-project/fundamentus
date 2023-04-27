import type { Knex } from 'knex';
import type { ForeignKey } from '../types/foreign-key.js';
import type { SchemaOverview } from '../types/overview.js';
import type { SchemaInspector } from '../types/schema-inspector.js';
import type { Table } from '../types/table.js';
import type { Column } from '../types/column.js';
type RawColumn = {
    TABLE_NAME: string;
    COLUMN_NAME: string;
    DATA_DEFAULT: any | null;
    DATA_TYPE: string;
    DATA_LENGTH: number | null;
    DATA_PRECISION: number | null;
    DATA_SCALE: number | null;
    NULLABLE: 'Y' | 'N';
    COLUMN_COMMENT: string | null;
    REFERENCED_TABLE_NAME: string | null;
    REFERENCED_COLUMN_NAME: string | null;
    CONSTRAINT_TYPE: 'P' | 'U' | 'R' | null;
    VIRTUAL_COLUMN: 'YES' | 'NO';
    IDENTITY_COLUMN: 'YES' | 'NO';
};
export declare function rawColumnToColumn(rawColumn: RawColumn): Column;
export declare function parseDefaultValue(value: string | null): string | null;
export default class oracleDB implements SchemaInspector {
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
    primary(table: string): Promise<string>;
    foreignKeys(table?: string): Promise<ForeignKey[]>;
}
export {};

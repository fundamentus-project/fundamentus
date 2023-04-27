import type { Knex } from 'knex';
import type { Column } from '../types/column.js';
import type { SchemaOverview } from '../types/overview.js';
import type { SchemaInspector } from '../types/schema-inspector.js';
import type { Table } from '../types/table.js';
type RawColumn = {
    TABLE_NAME: string;
    COLUMN_NAME: string;
    COLUMN_DEFAULT: any | null;
    COLUMN_TYPE: string;
    CHARACTER_MAXIMUM_LENGTH: number | null;
    NUMERIC_PRECISION: number | null;
    NUMERIC_SCALE: number | null;
    IS_NULLABLE: 'YES' | 'NO';
    COLLATION_NAME: string | null;
    COLUMN_COMMENT: string | null;
    REFERENCED_TABLE_NAME: string | null;
    REFERENCED_COLUMN_NAME: string | null;
    UPDATE_RULE: string | null;
    DELETE_RULE: string | null;
    COLUMN_KEY: 'PRI' | 'UNI' | null;
    EXTRA: 'auto_increment' | 'STORED GENERATED' | 'VIRTUAL GENERATED' | null;
    CONSTRAINT_NAME: 'PRIMARY' | null;
    GENERATION_EXPRESSION: string;
};
export declare function rawColumnToColumn(rawColumn: RawColumn): Column;
export declare function parseDefaultValue(value: string | null): string | null;
export default class MySQL implements SchemaInspector {
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
    foreignKeys(table?: string): Promise<{
        table: string;
        column: string;
        foreign_key_table: string;
        foreign_key_column: string;
        foreign_key_schema?: string;
        constraint_name: string | null;
        on_update: "NO ACTION" | "RESTRICT" | "CASCADE" | "SET NULL" | "SET DEFAULT" | null;
        on_delete: "NO ACTION" | "RESTRICT" | "CASCADE" | "SET NULL" | "SET DEFAULT" | null;
    }[]>;
}
export {};

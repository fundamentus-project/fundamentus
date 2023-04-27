import type { Knex } from 'knex';
import type { Column } from '../types/column.js';
import type { ForeignKey } from '../types/foreign-key.js';
import type { SchemaOverview } from '../types/overview.js';
import type { SchemaInspector } from '../types/schema-inspector.js';
import type { Table } from '../types/table.js';
type RawColumn = {
    table: string;
    name: string;
    data_type: string;
    max_length: number | null;
    numeric_precision: number | null;
    numeric_scale: number | null;
    is_generated: boolean | null;
    is_nullable: 'YES' | 'NO';
    default_value: string | null;
    is_unique: true | null;
    is_primary_key: true | null;
    has_auto_increment: 'YES' | 'NO';
    foreign_key_table: string | null;
    foreign_key_column: string | null;
    generation_expression: string | null;
};
export declare function rawColumnToColumn(rawColumn: RawColumn): Column;
export declare function parseDefaultValue(value: string | null): string | null;
export default class MSSQL implements SchemaInspector {
    knex: Knex;
    _schema?: string;
    constructor(knex: Knex);
    /**
     * Set the schema to be used in other methods
     */
    withSchema(schema: string): this;
    get schema(): string;
    set schema(value: string);
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

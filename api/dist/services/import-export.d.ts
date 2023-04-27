/// <reference types="node" resolution-mode="require"/>
import type { Accountability, Query, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { Readable } from 'node:stream';
import type { AbstractServiceOptions, File } from '../types/index.js';
type ExportFormat = 'csv' | 'json' | 'xml' | 'yaml';
export declare class ImportService {
    knex: Knex;
    accountability: Accountability | null;
    schema: SchemaOverview;
    constructor(options: AbstractServiceOptions);
    import(collection: string, mimetype: string, stream: Readable): Promise<void>;
    importJSON(collection: string, stream: Readable): Promise<void>;
    importCSV(collection: string, stream: Readable): Promise<void>;
}
export declare class ExportService {
    knex: Knex;
    accountability: Accountability | null;
    schema: SchemaOverview;
    constructor(options: AbstractServiceOptions);
    /**
     * Export the query results as a named file. Will query in batches, and keep appending a tmp file
     * until all the data is retrieved. Uploads the result as a new file using the regular
     * FilesService upload method.
     */
    exportToFile(collection: string, query: Partial<Query>, format: ExportFormat, options?: {
        file?: Partial<File>;
    }): Promise<void>;
    /**
     * Transform a given input object / array to the given type
     */
    transform(input: Record<string, any>[], format: ExportFormat, options?: {
        includeHeader?: boolean;
        includeFooter?: boolean;
    }): string;
}
export {};

/// <reference types="node" resolution-mode="require"/>
import type { Readable } from 'node:stream';
import type { AbstractServiceOptions, File, Metadata, MutationOptions, PrimaryKey } from '../types/index.js';
import { ItemsService } from './items.js';
export declare class FilesService extends ItemsService {
    constructor(options: AbstractServiceOptions);
    /**
     * Upload a single new file to the configured storage adapter
     */
    uploadOne(stream: Readable, data: Partial<File> & {
        storage: string;
    }, primaryKey?: PrimaryKey, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Extract metadata from a buffer's content
     */
    getMetadata(stream: Readable, allowList?: any): Promise<Metadata>;
    /**
     * Import a single file from an external URL
     */
    importOne(importURL: string, body: Partial<File>): Promise<PrimaryKey>;
    /**
     * Create a file (only applicable when it is not a multipart/data POST request)
     * Useful for associating metadata with existing file in storage
     */
    createOne(data: Partial<File>, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Delete a file
     */
    deleteOne(key: PrimaryKey, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Delete multiple files
     */
    deleteMany(keys: PrimaryKey[], opts?: MutationOptions): Promise<PrimaryKey[]>;
}

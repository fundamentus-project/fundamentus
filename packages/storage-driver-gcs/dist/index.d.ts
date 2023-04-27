/// <reference types="node" resolution-mode="require"/>
import type { Driver, Range } from '@directus/storage';
import type { Readable } from 'node:stream';
export type DriverGCSConfig = {
    root?: string;
    bucket: string;
    apiEndpoint?: string;
};
export declare class DriverGCS implements Driver {
    private root;
    private bucket;
    constructor(config: DriverGCSConfig);
    private fullPath;
    private file;
    read(filepath: string, range?: Range): Promise<Readable>;
    write(filepath: string, content: Readable): Promise<void>;
    delete(filepath: string): Promise<void>;
    stat(filepath: string): Promise<{
        size: any;
        modified: any;
    }>;
    exists(filepath: string): Promise<boolean>;
    move(src: string, dest: string): Promise<void>;
    copy(src: string, dest: string): Promise<void>;
    list(prefix?: string): AsyncGenerator<string, void, unknown>;
}
export default DriverGCS;

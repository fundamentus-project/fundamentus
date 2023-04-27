/// <reference types="node" resolution-mode="require"/>
import type { Driver, Range } from '@directus/storage';
import type { Readable } from 'node:stream';
export type DriverAzureConfig = {
    containerName: string;
    accountName: string;
    accountKey: string;
    root?: string;
    endpoint?: string;
};
export declare class DriverAzure implements Driver {
    private containerClient;
    private signedCredentials;
    private root;
    constructor(config: DriverAzureConfig);
    private fullPath;
    read(filepath: string, range?: Range): Promise<Readable>;
    write(filepath: string, content: Readable, type?: string): Promise<void>;
    delete(filepath: string): Promise<void>;
    stat(filepath: string): Promise<{
        size: number;
        modified: Date;
    }>;
    exists(filepath: string): Promise<boolean>;
    move(src: string, dest: string): Promise<void>;
    copy(src: string, dest: string): Promise<void>;
    list(prefix?: string): AsyncGenerator<string, void, unknown>;
}
export default DriverAzure;

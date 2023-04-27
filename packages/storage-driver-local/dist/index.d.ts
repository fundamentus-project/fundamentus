/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import type { Driver, Range } from '@directus/storage';
import type { Readable } from 'node:stream';
export type DriverLocalConfig = {
    root: string;
};
export declare class DriverLocal implements Driver {
    private root;
    constructor(config: DriverLocalConfig);
    private fullPath;
    /**
     * Ensures that the directory exists. If it doesn't, it's created.
     */
    private ensureDir;
    read(filepath: string, range?: Range): Promise<import("fs").ReadStream>;
    stat(filepath: string): Promise<{
        size: number;
        modified: Date;
    }>;
    exists(filepath: string): Promise<boolean>;
    move(src: string, dest: string): Promise<void>;
    copy(src: string, dest: string): Promise<void>;
    write(filepath: string, content: Readable): Promise<void>;
    delete(filepath: string): Promise<void>;
    list(prefix?: string): AsyncGenerator<string, any, unknown>;
    private listGenerator;
}
export default DriverLocal;

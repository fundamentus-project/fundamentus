/// <reference types="node" resolution-mode="require"/>
import type { Readable } from 'node:stream';
export declare class StorageManager {
    private drivers;
    private locations;
    registerDriver(name: string, driver: typeof Driver): void;
    registerLocation(name: string, config: DriverConfig): void;
    location(name: string): Driver;
}
export type Range = {
    start?: number;
    end?: number;
};
export type Stat = {
    size: number;
    modified: Date;
};
export declare class Driver {
    constructor(config: Record<string, unknown>);
    read(filepath: string, range?: Range): Promise<Readable>;
    write(filepath: string, content: Readable, type?: string): Promise<void>;
    delete(filepath: string): Promise<void>;
    stat(filepath: string): Promise<Stat>;
    exists(filepath: string): Promise<boolean>;
    move(src: string, dest: string): Promise<void>;
    copy(src: string, dest: string): Promise<void>;
    list(prefix?: string): AsyncIterable<string>;
}
export type DriverConfig = {
    driver: string;
    options: Record<string, unknown>;
};

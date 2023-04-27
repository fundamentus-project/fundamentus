/// <reference types="node" resolution-mode="require"/>
export declare function compress(raw: Record<string, any> | Record<string, any>[]): Promise<Buffer>;
export declare function decompress(compressed: Buffer): Promise<any>;

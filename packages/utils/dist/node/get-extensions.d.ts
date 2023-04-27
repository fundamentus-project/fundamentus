import type { Extension } from '@directus/types';
export declare const findExtension: (folder: string, filename: string) => Promise<string>;
export declare function resolvePackageExtensions(root: string, extensionNames?: string[]): Promise<Extension[]>;
export declare function getPackageExtensions(root: string): Promise<Extension[]>;
export declare function getLocalExtensions(root: string): Promise<Extension[]>;

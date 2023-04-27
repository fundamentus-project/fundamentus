import type { Driver } from '@directus/storage';
export declare const _aliasMap: Record<string, string>;
export declare const getStorageDriver: (driverName: string) => Promise<typeof Driver>;

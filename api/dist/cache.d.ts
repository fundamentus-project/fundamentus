import type { SchemaOverview } from '@directus/types';
import Keyv from 'keyv';
export declare function getCache(): {
    cache: Keyv | null;
    systemCache: Keyv;
    sharedSchemaCache: Keyv;
    localSchemaCache: Keyv;
    lockCache: Keyv;
};
export declare function flushCaches(forced?: boolean): Promise<void>;
export declare function clearSystemCache(opts?: {
    forced?: boolean | undefined;
    autoPurgeCache?: false | undefined;
}): Promise<void>;
export declare function setSystemCache(key: string, value: any, ttl?: number): Promise<void>;
export declare function getSystemCache(key: string): Promise<Record<string, any>>;
export declare function setSchemaCache(schema: SchemaOverview): Promise<void>;
export declare function getSchemaCache(): Promise<SchemaOverview | undefined>;
export declare function setCacheValue(cache: Keyv, key: string, value: Record<string, any> | Record<string, any>[], ttl?: number): Promise<void>;
export declare function getCacheValue(cache: Keyv, key: string): Promise<any>;

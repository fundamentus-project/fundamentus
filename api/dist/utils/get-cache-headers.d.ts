import type { Request } from 'express';
/**
 * Returns the Cache-Control header for the current request
 *
 * @param req Express request object
 * @param ttl TTL of the cache in ms
 * @param globalCacheSettings Whether requests are affected by the global cache settings (i.e. for dynamic API requests)
 * @param personalized Whether requests depend on the authentication status of users
 */
export declare function getCacheControlHeader(req: Request, ttl: number | undefined, globalCacheSettings: boolean, personalized: boolean): string;

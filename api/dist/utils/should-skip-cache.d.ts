import type { Request } from 'express';
/**
 * Whether to skip caching for the current request
 *
 * @param req Express request object
 */
export declare function shouldSkipCache(req: Request): boolean;

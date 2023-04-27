import type { RequestHandler } from 'express';
import type { RateLimiterMemcache, RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';
declare let checkRateLimit: RequestHandler;
export declare let rateLimiter: RateLimiterRedis | RateLimiterMemcache | RateLimiterMemory;
export default checkRateLimit;

import type { IRateLimiterOptions, IRateLimiterStoreOptions, RateLimiterAbstract } from 'rate-limiter-flexible';
type IRateLimiterOptionsOverrides = Partial<IRateLimiterOptions> | Partial<IRateLimiterStoreOptions>;
export declare function createRateLimiter(configPrefix?: string, configOverrides?: IRateLimiterOptionsOverrides): RateLimiterAbstract;
export {};

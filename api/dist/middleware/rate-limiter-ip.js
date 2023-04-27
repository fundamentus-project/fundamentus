import ms from 'ms';
import env from '../env.js';
import { HitRateLimitException } from '../exceptions/index.js';
import { createRateLimiter } from '../rate-limiter.js';
import asyncHandler from '../utils/async-handler.js';
import { getIPFromReq } from '../utils/get-ip-from-req.js';
import { validateEnv } from '../utils/validate-env.js';
let checkRateLimit = (_req, _res, next) => next();
export let rateLimiter;
if (env['RATE_LIMITER_ENABLED'] === true) {
    validateEnv(['RATE_LIMITER_STORE', 'RATE_LIMITER_DURATION', 'RATE_LIMITER_POINTS']);
    rateLimiter = createRateLimiter('RATE_LIMITER');
    checkRateLimit = asyncHandler(async (req, res, next) => {
        try {
            await rateLimiter.consume(getIPFromReq(req), 1);
        }
        catch (rateLimiterRes) {
            if (rateLimiterRes instanceof Error)
                throw rateLimiterRes;
            res.set('Retry-After', String(Math.round(rateLimiterRes.msBeforeNext / 1000)));
            throw new HitRateLimitException(`Too many requests, retry after ${ms(rateLimiterRes.msBeforeNext)}.`, {
                limit: +env['RATE_LIMITER_POINTS'],
                reset: new Date(Date.now() + rateLimiterRes.msBeforeNext),
            });
        }
        next();
    });
}
export default checkRateLimit;

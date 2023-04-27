import { BaseException } from '@directus/exceptions';
export class HitRateLimitException extends BaseException {
    constructor(message, extensions) {
        super(message, 429, 'REQUESTS_EXCEEDED', extensions);
    }
}

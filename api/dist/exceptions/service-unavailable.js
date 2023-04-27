import { BaseException } from '@directus/exceptions';
export class ServiceUnavailableException extends BaseException {
    constructor(message, extensions) {
        super(message, 503, 'SERVICE_UNAVAILABLE', extensions);
    }
}

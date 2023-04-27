import { BaseException } from '@directus/exceptions';
export class InvalidPayloadException extends BaseException {
    constructor(message, extensions) {
        super(message, 400, 'INVALID_PAYLOAD', extensions);
    }
}

import { BaseException } from '@directus/exceptions';
export class UnexpectedResponseException extends BaseException {
    constructor(message) {
        super(message, 503, 'UNEXPECTED_RESPONSE');
    }
}

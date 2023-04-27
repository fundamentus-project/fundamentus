import { BaseException } from '@directus/exceptions';
export class InvalidQueryException extends BaseException {
    constructor(message) {
        super(message, 400, 'INVALID_QUERY');
    }
}

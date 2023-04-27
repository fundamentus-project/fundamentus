import { BaseException } from '@directus/exceptions';
export class NotNullViolationException extends BaseException {
    constructor(field, exceptions) {
        super(`Value for field "${field}" can't be null.`, 400, 'NOT_NULL_VIOLATION', exceptions);
    }
}

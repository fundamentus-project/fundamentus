import { BaseException } from '@directus/exceptions';
export class ValueTooLongException extends BaseException {
    constructor(field, extensions) {
        if (field) {
            super(`Value for field "${field}" is too long.`, 400, 'VALUE_TOO_LONG', extensions);
        }
        else {
            super(`Value is too long.`, 400, 'VALUE_TOO_LONG', extensions);
        }
    }
}

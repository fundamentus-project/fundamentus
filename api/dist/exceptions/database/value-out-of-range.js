import { BaseException } from '@directus/exceptions';
export class ValueOutOfRangeException extends BaseException {
    constructor(field, exceptions) {
        if (field) {
            super(`Numeric value in field "${field ?? ''}" is out of range.`, 400, 'VALUE_OUT_OF_RANGE', exceptions);
        }
        else {
            super(`Numeric value is out of range.`, 400, 'VALUE_OUT_OF_RANGE', exceptions);
        }
    }
}

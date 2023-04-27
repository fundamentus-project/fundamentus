import { BaseException } from '@directus/exceptions';
export class ContainsNullValuesException extends BaseException {
    constructor(field, exceptions) {
        super(`Field "${field}" contains null values.`, 400, 'CONTAINS_NULL_VALUES', exceptions);
    }
}

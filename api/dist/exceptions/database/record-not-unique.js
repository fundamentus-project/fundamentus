import { BaseException } from '@directus/exceptions';
export class RecordNotUniqueException extends BaseException {
    constructor(field, extensions) {
        if (field) {
            super(`Field "${field}" has to be unique.`, 400, 'RECORD_NOT_UNIQUE', extensions);
        }
        else {
            super(`Field has to be unique.`, 400, 'RECORD_NOT_UNIQUE', extensions);
        }
    }
}

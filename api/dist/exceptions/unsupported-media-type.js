import { BaseException } from '@directus/exceptions';
export class UnsupportedMediaTypeException extends BaseException {
    constructor(message, extensions) {
        super(message, 415, 'UNSUPPORTED_MEDIA_TYPE', extensions);
    }
}

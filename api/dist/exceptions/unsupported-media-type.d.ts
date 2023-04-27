import { BaseException } from '@directus/exceptions';
export declare class UnsupportedMediaTypeException extends BaseException {
    constructor(message: string, extensions?: Record<string, unknown>);
}

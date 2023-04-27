import { BaseException } from '@directus/exceptions';
export declare class InvalidPayloadException extends BaseException {
    constructor(message: string, extensions?: Record<string, unknown>);
}

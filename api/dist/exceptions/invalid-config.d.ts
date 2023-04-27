import { BaseException } from '@directus/exceptions';
export declare class InvalidConfigException extends BaseException {
    constructor(message?: string, extensions?: Record<string, any>);
}

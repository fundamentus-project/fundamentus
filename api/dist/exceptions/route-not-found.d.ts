import { BaseException } from '@directus/exceptions';
export declare class RouteNotFoundException extends BaseException {
    constructor(path: string);
}

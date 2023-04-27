import { BaseException } from '@directus/exceptions';
export class RouteNotFoundException extends BaseException {
    constructor(path) {
        super(`Route ${path} doesn't exist.`, 404, 'ROUTE_NOT_FOUND');
    }
}

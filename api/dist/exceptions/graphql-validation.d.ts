import * as sharedExceptions from '@directus/exceptions';
export declare class GraphQLValidationException extends sharedExceptions.BaseException {
    constructor(extensions: Record<string, any>);
}

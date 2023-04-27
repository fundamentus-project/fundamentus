import { BaseException } from '@directus/exceptions';
type Extensions = {
    limit: number;
    reset: Date;
};
export declare class HitRateLimitException extends BaseException {
    constructor(message: string, extensions: Extensions);
}
export {};

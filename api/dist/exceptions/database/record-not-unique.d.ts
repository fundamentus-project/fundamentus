import { BaseException } from '@directus/exceptions';
type Extensions = {
    collection: string;
    field: string | null;
    invalid?: string | undefined;
};
export declare class RecordNotUniqueException extends BaseException {
    constructor(field: string | null, extensions?: Extensions);
}
export {};

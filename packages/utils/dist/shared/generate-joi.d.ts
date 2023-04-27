import type { FieldFilter } from '@directus/types';
import type { AnySchema, StringSchema as BaseStringSchema } from 'joi';
import BaseJoi from 'joi';
export interface StringSchema extends BaseStringSchema {
    contains(substring: string): this;
    ncontains(substring: string): this;
}
export declare const Joi: typeof BaseJoi;
export type JoiOptions = {
    requireAll?: boolean;
};
/**
 * Generate a Joi schema from a filter object.
 *
 * @param {FieldFilter} filter - Field filter object. Note: does not support _and/_or filters.
 * @param {JoiOptions} [options] - Options for the schema generation.
 * @returns {AnySchema} Joi schema.
 */
export declare function generateJoi(filter: FieldFilter | null, options?: JoiOptions): AnySchema;

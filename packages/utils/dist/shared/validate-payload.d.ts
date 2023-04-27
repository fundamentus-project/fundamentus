import type { Filter } from '@directus/types';
import type Joi from 'joi';
import type { JoiOptions } from './generate-joi.js';
/**
 * Validate the payload against the given filter rules
 *
 * @param {Filter} filter - The filter rules to check against
 * @param {Record<string, any>} payload - The payload to validate
 * @param {JoiOptions} [options] - Optional options to pass to Joi
 * @returns Array of errors
 */
export declare function validatePayload(filter: Filter, payload: Record<string, any>, options?: JoiOptions): Joi.ValidationError[];

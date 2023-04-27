import BaseJoi from 'joi';
import { escapeRegExp, merge } from 'lodash-es';
export const Joi = BaseJoi.extend({
    type: 'string',
    base: BaseJoi.string(),
    messages: {
        'string.contains': '{{#label}} must contain [{{#substring}}]',
        'string.ncontains': "{{#label}} can't contain [{{#substring}}]",
    },
    rules: {
        contains: {
            args: [
                {
                    name: 'substring',
                    ref: true,
                    assert: (val) => typeof val === 'string',
                    message: 'must be a string',
                },
            ],
            method(substring) {
                return this.$_addRule({ name: 'contains', args: { substring } });
            },
            validate(value, helpers, { substring }) {
                if (value.includes(substring) === false) {
                    return helpers.error('string.contains', { substring });
                }
                return value;
            },
        },
        ncontains: {
            args: [
                {
                    name: 'substring',
                    ref: true,
                    assert: (val) => typeof val === 'string',
                    message: 'must be a string',
                },
            ],
            method(substring) {
                return this.$_addRule({ name: 'ncontains', args: { substring } });
            },
            validate(value, helpers, { substring }) {
                if (value.includes(substring) === true) {
                    return helpers.error('string.ncontains', { substring });
                }
                return value;
            },
        },
    },
});
const defaults = {
    requireAll: false,
};
/**
 * Generate a Joi schema from a filter object.
 *
 * @param {FieldFilter} filter - Field filter object. Note: does not support _and/_or filters.
 * @param {JoiOptions} [options] - Options for the schema generation.
 * @returns {AnySchema} Joi schema.
 */
export function generateJoi(filter, options) {
    filter = filter || {};
    options = merge({}, defaults, options);
    const schema = {};
    const key = Object.keys(filter)[0];
    if (!key) {
        throw new Error(`[generateJoi] Filter doesn't contain field key. Passed filter: ${JSON.stringify(filter)}`);
    }
    const value = Object.values(filter)[0];
    if (!value) {
        throw new Error(`[generateJoi] Filter doesn't contain filter rule. Passed filter: ${JSON.stringify(filter)}`);
    }
    if (Object.keys(value)[0]?.startsWith('_') === false) {
        schema[key] = generateJoi(value, options);
    }
    else {
        const operator = Object.keys(value)[0];
        const compareValue = Object.values(value)[0];
        const getAnySchema = () => schema[key] ?? Joi.any();
        const getStringSchema = () => (schema[key] ?? Joi.string());
        const getNumberSchema = () => (schema[key] ?? Joi.number());
        const getDateSchema = () => (schema[key] ?? Joi.date());
        if (operator === '_eq') {
            const numericValue = compareValue === null || compareValue === '' || compareValue === true || compareValue === false
                ? NaN
                : Number(compareValue);
            if (isNaN(numericValue)) {
                schema[key] = getAnySchema().equal(compareValue);
            }
            else {
                schema[key] = getAnySchema().equal(compareValue, numericValue);
            }
        }
        if (operator === '_neq') {
            const numericValue = compareValue === null || compareValue === '' || compareValue === true || compareValue === false
                ? NaN
                : Number(compareValue);
            if (isNaN(numericValue)) {
                schema[key] = getAnySchema().not(compareValue);
            }
            else {
                schema[key] = getAnySchema().not(compareValue, numericValue);
            }
        }
        if (operator === '_contains') {
            if (compareValue === null || compareValue === undefined || typeof compareValue !== 'string') {
                schema[key] = Joi.any().equal(true);
            }
            else {
                schema[key] = getStringSchema().contains(compareValue);
            }
        }
        if (operator === '_icontains') {
            if (compareValue === null || compareValue === undefined || typeof compareValue !== 'string') {
                schema[key] = Joi.any().equal(true);
            }
            else {
                schema[key] = getStringSchema().contains(compareValue);
            }
        }
        if (operator === '_ncontains') {
            if (compareValue === null || compareValue === undefined || typeof compareValue !== 'string') {
                schema[key] = Joi.any().equal(true);
            }
            else {
                schema[key] = getStringSchema().ncontains(compareValue);
            }
        }
        if (operator === '_starts_with') {
            if (compareValue === null || compareValue === undefined || typeof compareValue !== 'string') {
                schema[key] = Joi.any().equal(true);
            }
            else {
                schema[key] = getStringSchema().pattern(new RegExp(`^${escapeRegExp(compareValue)}.*`), {
                    name: 'starts_with',
                });
            }
        }
        if (operator === '_nstarts_with') {
            if (compareValue === null || compareValue === undefined || typeof compareValue !== 'string') {
                schema[key] = Joi.any().equal(true);
            }
            else {
                schema[key] = getStringSchema().pattern(new RegExp(`^${escapeRegExp(compareValue)}.*`), {
                    name: 'starts_with',
                    invert: true,
                });
            }
        }
        if (operator === '_ends_with') {
            if (compareValue === null || compareValue === undefined || typeof compareValue !== 'string') {
                schema[key] = Joi.any().equal(true);
            }
            else {
                schema[key] = getStringSchema().pattern(new RegExp(`.*${escapeRegExp(compareValue)}$`), {
                    name: 'ends_with',
                });
            }
        }
        if (operator === '_nends_with') {
            if (compareValue === null || compareValue === undefined || typeof compareValue !== 'string') {
                schema[key] = Joi.any().equal(true);
            }
            else {
                schema[key] = getStringSchema().pattern(new RegExp(`.*${escapeRegExp(compareValue)}$`), {
                    name: 'ends_with',
                    invert: true,
                });
            }
        }
        if (operator === '_in') {
            schema[key] = getAnySchema().equal(...compareValue);
        }
        if (operator === '_nin') {
            schema[key] = getAnySchema().not(...compareValue);
        }
        if (operator === '_gt') {
            const isDate = compareValue instanceof Date || Number.isNaN(Number(compareValue));
            schema[key] = isDate
                ? getDateSchema().greater(compareValue)
                : getNumberSchema().greater(Number(compareValue));
        }
        if (operator === '_gte') {
            const isDate = compareValue instanceof Date || Number.isNaN(Number(compareValue));
            schema[key] = isDate
                ? getDateSchema().min(compareValue)
                : getNumberSchema().min(Number(compareValue));
        }
        if (operator === '_lt') {
            const isDate = compareValue instanceof Date || Number.isNaN(Number(compareValue));
            schema[key] = isDate
                ? getDateSchema().less(compareValue)
                : getNumberSchema().less(Number(compareValue));
        }
        if (operator === '_lte') {
            const isDate = compareValue instanceof Date || Number.isNaN(Number(compareValue));
            schema[key] = isDate
                ? getDateSchema().max(compareValue)
                : getNumberSchema().max(Number(compareValue));
        }
        if (operator === '_null') {
            schema[key] = getAnySchema().valid(null);
        }
        if (operator === '_nnull') {
            schema[key] = getAnySchema().invalid(null);
        }
        if (operator === '_empty') {
            schema[key] = getAnySchema().valid('');
        }
        if (operator === '_nempty') {
            schema[key] = getAnySchema().invalid('');
        }
        if (operator === '_between') {
            if (compareValue.every((value) => {
                const val = Number(value instanceof Date ? NaN : value);
                return !Number.isNaN(val) && Math.abs(val) <= Number.MAX_SAFE_INTEGER;
            })) {
                const values = compareValue;
                schema[key] = getNumberSchema().min(Number(values[0])).max(Number(values[1]));
            }
            else {
                const values = compareValue;
                schema[key] = getDateSchema().min(values[0]).max(values[1]);
            }
        }
        if (operator === '_nbetween') {
            if (compareValue.every((value) => {
                const val = Number(value instanceof Date ? NaN : value);
                return !Number.isNaN(val) && Math.abs(val) <= Number.MAX_SAFE_INTEGER;
            })) {
                const values = compareValue;
                schema[key] = getNumberSchema().less(Number(values[0])).greater(Number(values[1]));
            }
            else {
                const values = compareValue;
                schema[key] = getDateSchema().less(values[0]).greater(values[1]);
            }
        }
        if (operator === '_submitted') {
            schema[key] = getAnySchema().required();
        }
        if (operator === '_regex') {
            if (compareValue === null || compareValue === undefined) {
                schema[key] = Joi.any().equal(true);
            }
            else {
                const wrapped = typeof compareValue === 'string' ? compareValue.startsWith('/') && compareValue.endsWith('/') : false;
                schema[key] = getStringSchema().regex(new RegExp(wrapped ? compareValue.slice(1, -1) : compareValue));
            }
        }
    }
    schema[key] = schema[key] ?? Joi.any();
    if (options.requireAll) {
        schema[key] = schema[key].required();
    }
    return Joi.object(schema).unknown();
}

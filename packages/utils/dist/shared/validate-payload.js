import { flatten } from 'lodash-es';
import { generateJoi } from './generate-joi.js';
import { injectFunctionResults } from './inject-function-results.js';
/**
 * Validate the payload against the given filter rules
 *
 * @param {Filter} filter - The filter rules to check against
 * @param {Record<string, any>} payload - The payload to validate
 * @param {JoiOptions} [options] - Optional options to pass to Joi
 * @returns Array of errors
 */
export function validatePayload(filter, payload, options) {
    const errors = [];
    /**
     * Note there can only be a single _and / _or per level
     */
    if (Object.keys(filter)[0] === '_and') {
        const subValidation = Object.values(filter)[0];
        const nestedErrors = flatten(subValidation.map((subObj) => {
            return validatePayload(subObj, payload, options);
        })).filter((err) => err);
        errors.push(...nestedErrors);
    }
    else if (Object.keys(filter)[0] === '_or') {
        const subValidation = Object.values(filter)[0];
        const swallowErrors = [];
        const pass = subValidation.some((subObj) => {
            const nestedErrors = validatePayload(subObj, payload, options);
            if (nestedErrors.length > 0) {
                swallowErrors.push(...nestedErrors);
                return false;
            }
            return true;
        });
        if (!pass) {
            errors.push(...swallowErrors);
        }
    }
    else {
        const payloadWithFunctions = injectFunctionResults(payload, filter);
        const schema = generateJoi(filter, options);
        const { error } = schema.validate(payloadWithFunctions, { abortEarly: false });
        if (error) {
            errors.push(error);
        }
    }
    return errors;
}

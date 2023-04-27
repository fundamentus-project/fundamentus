import { parseJSON } from '@directus/utils';
import env from '../env.js';
import logger from '../logger.js';
import getLocalType from './get-local-type.js';
export default function getDefaultValue(column) {
    const type = getLocalType(column);
    const defaultValue = column.default_value ?? null;
    if (defaultValue === null)
        return null;
    if (defaultValue === '0000-00-00 00:00:00')
        return null;
    switch (type) {
        case 'bigInteger':
        case 'integer':
        case 'decimal':
        case 'float':
            return Number.isNaN(Number(defaultValue)) === false ? Number(defaultValue) : defaultValue;
        case 'boolean':
            return castToBoolean(defaultValue);
        case 'json':
            return castToObject(defaultValue);
        default:
            return defaultValue;
    }
}
function castToBoolean(value) {
    if (typeof value === 'boolean')
        return value;
    if (value === 0 || value === '0')
        return false;
    if (value === 1 || value === '1')
        return true;
    if (value === 'false' || value === false)
        return false;
    if (value === 'true' || value === true)
        return true;
    return Boolean(value);
}
function castToObject(value) {
    if (!value)
        return value;
    if (typeof value === 'object')
        return value;
    if (typeof value === 'string') {
        try {
            return parseJSON(value);
        }
        catch (err) {
            if (env['NODE_ENV'] === 'development') {
                logger.error(err);
            }
            return value;
        }
    }
    return {};
}

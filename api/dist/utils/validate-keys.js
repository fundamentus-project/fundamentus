import validateUUID from 'uuid-validate';
import { ForbiddenException } from '../exceptions/forbidden.js';
/**
 * Validate keys based on its type
 */
export function validateKeys(schema, collection, keyField, keys) {
    if (Array.isArray(keys)) {
        for (const key of keys) {
            validateKeys(schema, collection, keyField, key);
        }
    }
    else {
        const primaryKeyFieldType = schema.collections[collection]?.fields[keyField]?.type;
        if (primaryKeyFieldType === 'uuid' && !validateUUID(String(keys))) {
            throw new ForbiddenException();
        }
        else if (primaryKeyFieldType === 'integer' && !Number.isInteger(Number(keys))) {
            throw new ForbiddenException();
        }
    }
}

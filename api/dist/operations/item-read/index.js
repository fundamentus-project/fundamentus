import { defineOperationApi, optionToObject, toArray } from '@directus/utils';
import { ItemsService } from '../../services/items.js';
import { getAccountabilityForRole } from '../../utils/get-accountability-for-role.js';
import { sanitizeQuery } from '../../utils/sanitize-query.js';
export default defineOperationApi({
    id: 'item-read',
    handler: async ({ collection, key, query, emitEvents, permissions }, { accountability, database, getSchema }) => {
        const schema = await getSchema({ database });
        let customAccountability;
        if (!permissions || permissions === '$trigger') {
            customAccountability = accountability;
        }
        else if (permissions === '$full') {
            customAccountability = await getAccountabilityForRole('system', { database, schema, accountability });
        }
        else if (permissions === '$public') {
            customAccountability = await getAccountabilityForRole(null, { database, schema, accountability });
        }
        else {
            customAccountability = await getAccountabilityForRole(permissions, { database, schema, accountability });
        }
        const itemsService = new ItemsService(collection, {
            schema,
            accountability: customAccountability,
            knex: database,
        });
        const queryObject = query ? optionToObject(query) : {};
        const sanitizedQueryObject = sanitizeQuery(queryObject, customAccountability);
        let result;
        if (!key || (Array.isArray(key) && key.length === 0)) {
            result = await itemsService.readByQuery(sanitizedQueryObject, { emitEvents: !!emitEvents });
        }
        else {
            const keys = toArray(key);
            if (keys.length === 1) {
                result = await itemsService.readOne(keys[0], sanitizedQueryObject, { emitEvents: !!emitEvents });
            }
            else {
                result = await itemsService.readMany(keys, sanitizedQueryObject, { emitEvents: !!emitEvents });
            }
        }
        return result;
    },
});

import { defineOperationApi, optionToObject, toArray } from '@directus/utils';
import { ItemsService } from '../../services/items.js';
import { getAccountabilityForRole } from '../../utils/get-accountability-for-role.js';
import { sanitizeQuery } from '../../utils/sanitize-query.js';
export default defineOperationApi({
    id: 'item-update',
    handler: async ({ collection, key, payload, query, emitEvents, permissions }, { accountability, database, getSchema }) => {
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
            schema: await getSchema({ database }),
            accountability: customAccountability,
            knex: database,
        });
        const payloadObject = optionToObject(payload) ?? null;
        const queryObject = query ? optionToObject(query) : {};
        const sanitizedQueryObject = sanitizeQuery(queryObject, customAccountability);
        if (!payloadObject) {
            return null;
        }
        let result;
        if (!key || (Array.isArray(key) && key.length === 0)) {
            result = await itemsService.updateByQuery(sanitizedQueryObject, payloadObject, { emitEvents: !!emitEvents });
        }
        else {
            const keys = toArray(key);
            if (keys.length === 1) {
                result = await itemsService.updateOne(keys[0], payloadObject, { emitEvents: !!emitEvents });
            }
            else {
                result = await itemsService.updateMany(keys, payloadObject, { emitEvents: !!emitEvents });
            }
        }
        return result;
    },
});

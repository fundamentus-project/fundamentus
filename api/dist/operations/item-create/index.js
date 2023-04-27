import { defineOperationApi, optionToObject, toArray } from '@directus/utils';
import { ItemsService } from '../../services/items.js';
import { getAccountabilityForRole } from '../../utils/get-accountability-for-role.js';
export default defineOperationApi({
    id: 'item-create',
    handler: async ({ collection, payload, emitEvents, permissions }, { accountability, database, getSchema }) => {
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
        let result;
        if (!payloadObject) {
            result = null;
        }
        else {
            result = await itemsService.createMany(toArray(payloadObject), { emitEvents: !!emitEvents });
        }
        return result;
    },
});

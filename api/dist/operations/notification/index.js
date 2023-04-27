import { defineOperationApi, optionToString, toArray } from '@directus/utils';
import { NotificationsService } from '../../services/notifications.js';
import { getAccountabilityForRole } from '../../utils/get-accountability-for-role.js';
export default defineOperationApi({
    id: 'notification',
    handler: async ({ recipient, subject, message, permissions }, { accountability, database, getSchema }) => {
        const schema = await getSchema({ database });
        let customAccountability;
        if (!permissions || permissions === '$trigger') {
            customAccountability = accountability;
        }
        else if (permissions === '$full') {
            customAccountability = null;
        }
        else if (permissions === '$public') {
            customAccountability = await getAccountabilityForRole(null, { database, schema, accountability });
        }
        else {
            customAccountability = await getAccountabilityForRole(permissions, { database, schema, accountability });
        }
        const notificationsService = new NotificationsService({
            schema: await getSchema({ database }),
            accountability: customAccountability,
            knex: database,
        });
        const messageString = message ? optionToString(message) : null;
        const payload = toArray(recipient).map((userId) => {
            return {
                recipient: userId,
                sender: customAccountability?.user ?? null,
                subject,
                message: messageString,
            };
        });
        const result = await notificationsService.createMany(payload);
        return result;
    },
});

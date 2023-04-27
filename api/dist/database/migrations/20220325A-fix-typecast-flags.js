import { toArray } from '@directus/utils';
import { isArray } from 'lodash-es';
export async function up(knex) {
    const fields = await knex
        .select('id', 'special')
        .from('directus_fields')
        .whereNotNull('special')
        .orWhere('special', '<>', '');
    for (const { id, special } of fields) {
        let parsedSpecial;
        try {
            if (special.includes('{')) {
                // Fix invalid data in Postgres
                parsedSpecial = toArray(special.replace(/{/g, '').replace(/}/g, '').replace(/"/g, ''));
            }
            else {
                parsedSpecial = toArray(special);
            }
        }
        catch {
            continue;
        }
        if (parsedSpecial && isArray(parsedSpecial)) {
            // Perform the update again in case it was not performed prior
            parsedSpecial = parsedSpecial.map((special) => {
                switch (special) {
                    case 'boolean':
                    case 'csv':
                    case 'json':
                        return 'cast-' + special;
                    default:
                        return special;
                }
            });
            const parsedSpecialString = parsedSpecial.join(',');
            if (parsedSpecialString !== special) {
                await knex('directus_fields').update({ special: parsedSpecialString }).where({ id });
            }
        }
    }
}
export async function down(_knex) {
    // Do nothing
}

import { getHelpers } from '../helpers/index.js';
export async function up(knex) {
    const helper = getHelpers(knex).schema;
    await helper.changeToType('directus_panels', 'icon', 'string', {
        nullable: true,
        default: null,
        length: 30,
    });
}
export async function down(knex) {
    const helper = getHelpers(knex).schema;
    await helper.changeToType('directus_panels', 'icon', 'string', {
        nullable: true,
        default: 'insert_chart',
        length: 30,
    });
}

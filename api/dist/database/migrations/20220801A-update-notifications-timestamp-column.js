import { getHelpers } from '../helpers/index.js';
export async function up(knex) {
    const helper = getHelpers(knex).schema;
    await helper.changeToType('directus_notifications', 'timestamp', 'timestamp', {
        nullable: true,
        default: knex.fn.now(),
    });
}
export async function down(knex) {
    const helper = getHelpers(knex).schema;
    await helper.changeToType('directus_notifications', 'timestamp', 'timestamp', {
        nullable: false,
    });
}

import { getHelpers } from '../helpers/index.js';
export async function up(knex) {
    const helper = getHelpers(knex).schema;
    if (helper.isOneOfClients(['oracle', 'cockroachdb'])) {
        return;
    }
    await knex.schema.alterTable('directus_files', (table) => {
        table.bigInteger('filesize').nullable().defaultTo(null).alter();
    });
}
export async function down(knex) {
    const helper = getHelpers(knex).schema;
    if (helper.isOneOfClients(['oracle', 'cockroachdb'])) {
        return;
    }
    await knex.schema.alterTable('directus_files', (table) => {
        table.integer('filesize').nullable().defaultTo(null).alter();
    });
}

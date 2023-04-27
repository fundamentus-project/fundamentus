export async function up(knex) {
    await knex.schema.alterTable('directus_webhooks', (table) => {
        table.json('headers');
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_webhooks', (table) => {
        table.dropColumn('headers');
    });
}

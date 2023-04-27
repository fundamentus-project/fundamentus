export async function up(knex) {
    await knex.schema.alterTable('directus_fields', (table) => {
        table.json('conditions');
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_fields', (table) => {
        table.dropColumn('conditions');
    });
}

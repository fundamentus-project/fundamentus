export async function up(knex) {
    await knex.schema.alterTable('directus_fields', (table) => {
        table.json('validation');
        table.text('validation_message');
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_fields', (table) => {
        table.dropColumn('validation');
        table.dropColumn('validation_message');
    });
}

export async function up(knex) {
    await knex.schema.alterTable('directus_fields', (table) => {
        table.boolean('required').defaultTo(false);
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_fields', (table) => {
        table.dropColumn('required');
    });
}

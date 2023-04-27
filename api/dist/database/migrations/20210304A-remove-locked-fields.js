export async function up(knex) {
    await knex.schema.alterTable('directus_fields', (table) => {
        table.dropColumn('locked');
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_fields', (table) => {
        table.boolean('locked').defaultTo(false).notNullable();
    });
}

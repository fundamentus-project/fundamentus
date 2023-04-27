export async function up(knex) {
    await knex.schema.alterTable('directus_settings', (table) => {
        table.json('translation_strings');
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_settings', (table) => {
        table.dropColumn('translation_strings');
    });
}

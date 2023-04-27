export async function up(knex) {
    await knex.schema.alterTable('directus_settings', (table) => {
        table.json('custom_aspect_ratios');
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_settings', (table) => {
        table.dropColumn('custom_aspect_ratios');
    });
}

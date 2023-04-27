export async function up(knex) {
    await knex.schema.alterTable('directus_settings', (table) => {
        table.json('basemaps');
        table.string('mapbox_key');
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_settings', (table) => {
        table.dropColumn('basemaps');
        table.dropColumn('mapbox_key');
    });
}

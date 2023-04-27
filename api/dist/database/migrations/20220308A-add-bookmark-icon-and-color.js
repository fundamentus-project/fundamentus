export async function up(knex) {
    await knex.schema.alterTable('directus_presets', (table) => {
        table.string('icon', 30).notNullable().defaultTo('bookmark_outline');
        table.string('color').nullable();
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_presets', (table) => {
        table.dropColumn('icon');
        table.dropColumn('color');
    });
}

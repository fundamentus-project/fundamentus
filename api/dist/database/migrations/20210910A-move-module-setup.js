export async function up(knex) {
    await knex.schema.alterTable('directus_roles', (table) => {
        table.dropColumn('module_list');
    });
    await knex.schema.alterTable('directus_settings', (table) => {
        table.json('module_bar');
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_roles', (table) => {
        table.json('module_list');
    });
    await knex.schema.alterTable('directus_settings', (table) => {
        table.dropColumn('module_bar');
    });
}

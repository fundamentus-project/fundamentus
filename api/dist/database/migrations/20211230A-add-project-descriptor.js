export async function up(knex) {
    await knex.schema.alterTable('directus_settings', (table) => {
        table.string('project_descriptor', 100).nullable();
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_settings', (table) => {
        table.dropColumn('project_descriptor');
    });
}

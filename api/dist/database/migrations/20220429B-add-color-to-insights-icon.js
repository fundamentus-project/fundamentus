export async function up(knex) {
    await knex.schema.alterTable('directus_dashboards', (table) => {
        table.string('color').nullable();
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_dashboards', (table) => {
        table.dropColumn('color');
    });
}

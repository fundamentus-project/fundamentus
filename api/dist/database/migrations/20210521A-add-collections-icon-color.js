export async function up(knex) {
    await knex.schema.alterTable('directus_collections', (table) => {
        table.string('color').nullable();
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_collections', (table) => {
        table.dropColumn('color');
    });
}

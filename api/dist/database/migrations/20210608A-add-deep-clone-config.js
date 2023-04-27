export async function up(knex) {
    await knex.schema.alterTable('directus_collections', (table) => {
        table.json('item_duplication_fields').nullable();
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_collections', (table) => {
        table.dropColumn('item_duplication_fields');
    });
}

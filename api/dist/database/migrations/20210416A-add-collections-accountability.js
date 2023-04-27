export async function up(knex) {
    await knex.schema.alterTable('directus_collections', (table) => {
        table.string('accountability').defaultTo('all');
    });
    await knex('directus_collections').update({ accountability: 'all' });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_collections', (table) => {
        table.dropColumn('accountability');
    });
}

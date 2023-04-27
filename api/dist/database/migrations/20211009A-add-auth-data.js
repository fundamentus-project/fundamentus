export async function up(knex) {
    await knex.schema.alterTable('directus_users', (table) => {
        table.json('auth_data');
    });
}
export async function down(knex) {
    await knex.schema.alterTable('directus_users', (table) => {
        table.dropColumn('auth_data');
    });
}

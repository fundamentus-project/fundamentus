export async function up(knex) {
    await knex('directus_fields').update({ interface: 'many-to-many' }).where({ interface: 'files' });
}
export async function down(_knex) {
    // Do nothing
}

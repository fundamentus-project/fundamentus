export async function up(knex) {
    await knex('directus_activity')
        .update({
        action: 'login',
    })
        .where('action', '=', 'authenticate');
}
export async function down(knex) {
    await knex('directus_activity')
        .update({
        action: 'authenticate',
    })
        .where('action', '=', 'login');
}

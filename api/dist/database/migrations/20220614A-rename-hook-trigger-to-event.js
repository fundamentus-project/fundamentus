export async function up(knex) {
    await knex('directus_flows').update({ trigger: 'event' }).where('trigger', '=', 'hook');
}
export async function down(knex) {
    await knex('directus_flows').update({ trigger: 'hook' }).where('trigger', '=', 'event');
}

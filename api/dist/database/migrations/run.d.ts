import type { Knex } from 'knex';
export default function run(database: Knex, direction: 'up' | 'down' | 'latest', log?: boolean): Promise<void>;

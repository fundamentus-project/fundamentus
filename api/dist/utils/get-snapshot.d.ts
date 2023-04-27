import type { SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { Snapshot } from '../types/index.js';
export declare function getSnapshot(options?: {
    database?: Knex;
    schema?: SchemaOverview;
}): Promise<Snapshot>;

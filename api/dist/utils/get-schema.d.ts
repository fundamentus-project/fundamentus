import type { SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
export declare function getSchema(options?: {
    database?: Knex;
    /**
     * To bypass any cached schema if bypassCache is enabled.
     * Used to ensure schema snapshot/apply is not using outdated schema
     */
    bypassCache?: boolean;
}): Promise<SchemaOverview>;

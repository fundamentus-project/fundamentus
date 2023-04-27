import type { Accountability, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { AbstractServiceOptions, PrimaryKey } from '../types/index.js';
export declare class UtilsService {
    knex: Knex;
    accountability: Accountability | null;
    schema: SchemaOverview;
    constructor(options: AbstractServiceOptions);
    sort(collection: string, { item, to }: {
        item: PrimaryKey;
        to: PrimaryKey;
    }): Promise<void>;
}

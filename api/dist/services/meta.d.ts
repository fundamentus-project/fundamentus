import type { Accountability, Query, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { AbstractServiceOptions } from '../types/index.js';
export declare class MetaService {
    knex: Knex;
    accountability: Accountability | null;
    schema: SchemaOverview;
    constructor(options: AbstractServiceOptions);
    getMetaForQuery(collection: string, query: any): Promise<Record<string, any> | undefined>;
    totalCount(collection: string): Promise<number>;
    filterCount(collection: string, query: Query): Promise<number>;
}

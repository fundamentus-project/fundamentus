import type { KNEX_TYPES } from '@directus/constants';
import type { Field, Relation, Type } from '@directus/types';
import type { Knex } from 'knex';
import type { DatabaseClient } from '../../../types/index.js';
import { DatabaseHelper } from '../types.js';
export type Options = {
    nullable?: boolean;
    default?: any;
    length?: number;
};
export declare abstract class SchemaHelper extends DatabaseHelper {
    isOneOfClients(clients: DatabaseClient[]): boolean;
    changeNullable(table: string, column: string, nullable: boolean): Promise<void>;
    changeToType(table: string, column: string, type: (typeof KNEX_TYPES)[number], options?: Options): Promise<void>;
    protected changeToTypeByCopy(table: string, column: string, type: (typeof KNEX_TYPES)[number], options: Options): Promise<void>;
    preColumnChange(): Promise<boolean>;
    postColumnChange(): Promise<void>;
    preRelationChange(_relation: Partial<Relation>): void;
    processFieldType(field: Field): Type;
    constraintName(existingName: string): string;
    applyLimit(rootQuery: Knex.QueryBuilder, limit: number): void;
    applyOffset(rootQuery: Knex.QueryBuilder, offset: number): void;
    castA2oPrimaryKey(): string;
    applyMultiRelationalSort(knex: Knex, dbQuery: Knex.QueryBuilder, table: string, primaryKey: string, orderByString: string, orderByFields: Knex.Raw[]): Knex.QueryBuilder;
    formatUUID(uuid: string): string;
}

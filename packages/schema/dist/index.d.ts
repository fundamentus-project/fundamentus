import type { Knex } from 'knex';
export * from './types/column.js';
export * from './types/foreign-key.js';
export * from './types/table.js';
export * from './types/overview.js';
export * from './types/schema-inspector.js';
export declare const createInspector: (knex: Knex) => import("./types/schema-inspector.js").SchemaInspector;

import type { SchemaInspector } from '@directus/schema';
import type { Knex } from 'knex';
import type { DatabaseClient } from '../types/index.js';
export default function getDatabase(): Knex;
export declare function getSchemaInspector(): SchemaInspector;
/**
 * Get database version. Value currently exists for MySQL only.
 *
 * @returns Cached database version
 */
export declare function getDatabaseVersion(): string | null;
export declare function hasDatabaseConnection(database?: Knex): Promise<boolean>;
export declare function validateDatabaseConnection(database?: Knex): Promise<void>;
export declare function getDatabaseClient(database?: Knex): DatabaseClient;
export declare function isInstalled(): Promise<boolean>;
export declare function validateMigrations(): Promise<boolean>;
/**
 * These database extensions should be optional, so we don't throw or return any problem states when they don't
 */
export declare function validateDatabaseExtensions(): Promise<void>;

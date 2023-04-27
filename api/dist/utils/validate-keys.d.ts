import type { SchemaOverview } from '@directus/types';
import type { PrimaryKey } from '../types/index.js';
/**
 * Validate keys based on its type
 */
export declare function validateKeys(schema: SchemaOverview, collection: string, keyField: string, keys: PrimaryKey | PrimaryKey[]): void;

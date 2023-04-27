import type { SQLError } from './dialects/types.js';
/**
 * Translates an error thrown by any of the databases into a pre-defined Exception. Currently
 * supports:
 * - Invalid Foreign Key
 * - Not Null Violation
 * - Record Not Unique
 * - Value Out of Range
 * - Value Too Long
 */
export declare function translateDatabaseError(error: SQLError): Promise<any>;

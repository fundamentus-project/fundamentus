import type { PostgresError } from './types.js';
export declare function extractError(error: PostgresError): PostgresError | Error;

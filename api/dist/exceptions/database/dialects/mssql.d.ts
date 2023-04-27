import type { MSSQLError } from './types.js';
export declare function extractError(error: MSSQLError): Promise<MSSQLError | Error>;

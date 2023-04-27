import { SchemaHelper } from '../types.js';
export declare class SchemaHelperSQLite extends SchemaHelper {
    preColumnChange(): Promise<boolean>;
    postColumnChange(): Promise<void>;
}

import type { Knex } from 'knex';
import { GeometryHelper } from '../types.js';
export declare class GeometryHelperSQLite extends GeometryHelper {
    supported(): Promise<boolean>;
    asGeoJSON(table: string, column: string): Knex.Raw;
}

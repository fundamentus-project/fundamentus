import type { Field, RawField } from '@directus/types';
import type { Knex } from 'knex';
import type { GeoJSONGeometry } from 'wellknown';
import { DatabaseHelper } from '../types.js';
export declare abstract class GeometryHelper extends DatabaseHelper {
    supported(): boolean | Promise<boolean>;
    isTrue(expression: Knex.Raw): Knex.Raw<any>;
    isFalse(expression: Knex.Raw): Knex.Raw<any>;
    createColumn(table: Knex.CreateTableBuilder, field: RawField | Field): Knex.ColumnBuilder;
    asText(table: string, column: string): Knex.Raw;
    fromText(text: string): Knex.Raw;
    fromGeoJSON(geojson: GeoJSONGeometry): Knex.Raw;
    _intersects(key: string, geojson: GeoJSONGeometry): Knex.Raw;
    intersects(key: string, geojson: GeoJSONGeometry): Knex.Raw;
    nintersects(key: string, geojson: GeoJSONGeometry): Knex.Raw;
    _intersects_bbox(key: string, geojson: GeoJSONGeometry): Knex.Raw;
    intersects_bbox(key: string, geojson: GeoJSONGeometry): Knex.Raw;
    nintersects_bbox(key: string, geojson: GeoJSONGeometry): Knex.Raw;
    collect(table: string, column: string): Knex.Raw;
}

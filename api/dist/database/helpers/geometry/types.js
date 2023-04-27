import { stringify as geojsonToWKT } from 'wellknown';
import { DatabaseHelper } from '../types.js';
export class GeometryHelper extends DatabaseHelper {
    supported() {
        return true;
    }
    isTrue(expression) {
        return expression;
    }
    isFalse(expression) {
        return expression.wrap('NOT ', '');
    }
    createColumn(table, field) {
        const type = field.type.split('.')[1] ?? 'geometry';
        return table.specificType(field.field, type);
    }
    asText(table, column) {
        return this.knex.raw('st_astext(??.??) as ??', [table, column, column]);
    }
    fromText(text) {
        return this.knex.raw('st_geomfromtext(?, 4326)', text);
    }
    fromGeoJSON(geojson) {
        return this.fromText(geojsonToWKT(geojson));
    }
    _intersects(key, geojson) {
        const geometry = this.fromGeoJSON(geojson);
        return this.knex.raw('st_intersects(??, ?)', [key, geometry]);
    }
    intersects(key, geojson) {
        return this.isTrue(this._intersects(key, geojson));
    }
    nintersects(key, geojson) {
        return this.isFalse(this._intersects(key, geojson));
    }
    _intersects_bbox(key, geojson) {
        const geometry = this.fromGeoJSON(geojson);
        return this.knex.raw('st_intersects(??, ?)', [key, geometry]);
    }
    intersects_bbox(key, geojson) {
        return this.isTrue(this._intersects_bbox(key, geojson));
    }
    nintersects_bbox(key, geojson) {
        return this.isFalse(this._intersects_bbox(key, geojson));
    }
    collect(table, column) {
        return this.knex.raw('st_astext(st_collect(??.??))', [table, column]);
    }
}

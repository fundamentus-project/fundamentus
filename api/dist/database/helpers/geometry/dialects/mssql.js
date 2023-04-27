import { GeometryHelper } from '../types.js';
export class GeometryHelperMSSQL extends GeometryHelper {
    isTrue(expression) {
        return expression.wrap(``, ` = 1`);
    }
    isFalse(expression) {
        return expression.wrap(``, ` = 0`);
    }
    createColumn(table, field) {
        if (field.type.split('.')[1]) {
            field.meta.special = [field.type];
        }
        return table.specificType(field.field, 'geometry');
    }
    asText(table, column) {
        return this.knex.raw('??.??.STAsText() as ??', [table, column, column]);
    }
    fromText(text) {
        return this.knex.raw('geometry::STGeomFromText(?, 4326)', text);
    }
    _intersects(key, geojson) {
        const geometry = this.fromGeoJSON(geojson);
        return this.knex.raw('??.STIntersects(?)', [key, geometry]);
    }
    _intersects_bbox(key, geojson) {
        const geometry = this.fromGeoJSON(geojson);
        return this.knex.raw('??.STEnvelope().STIntersects(?.STEnvelope())', [key, geometry]);
    }
    collect(table, column) {
        return this.knex.raw('geometry::CollectionAggregate(??.??).STAsText()', [table, column]);
    }
}

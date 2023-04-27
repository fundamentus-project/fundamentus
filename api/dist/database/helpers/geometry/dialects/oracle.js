import { GeometryHelper } from '../types.js';
export class GeometryHelperOracle extends GeometryHelper {
    isTrue(expression) {
        return expression.wrap(``, ` = 'TRUE'`);
    }
    isFalse(expression) {
        return expression.wrap(``, ` = 'FALSE'`);
    }
    createColumn(table, field) {
        if (field.type.split('.')[1]) {
            field.meta.special = [field.type];
        }
        return table.specificType(field.field, 'sdo_geometry');
    }
    asText(table, column) {
        return this.knex.raw('sdo_util.to_wktgeometry(??.??) as ??', [table, column, column]);
    }
    asGeoJSON(table, column) {
        return this.knex.raw('sdo_util.to_geojson(??.??) as ??', [table, column, column]);
    }
    fromText(text) {
        return this.knex.raw('sdo_geometry(?, 4326)', text);
    }
    _intersects(key, geojson) {
        const geometry = this.fromGeoJSON(geojson);
        return this.knex.raw(`sdo_overlapbdyintersect(??, ?)`, [key, geometry]);
    }
    _intersects_bbox(key, geojson) {
        const geometry = this.fromGeoJSON(geojson);
        return this.knex.raw(`sdo_overlapbdyintersect(sdo_geom.sdo_mbr(??), sdo_geom.sdo_mbr(?))`, [key, geometry]);
    }
    collect(table, column) {
        return this.knex.raw(`concat('geometrycollection(', listagg(?, ', '), ')'`, this.asText(table, column));
    }
}

import { GeometryHelper } from '../types.js';
export class GeometryHelperMySQL extends GeometryHelper {
    collect(table, column) {
        return this.knex.raw(`concat('geometrycollection(', group_concat(? separator ', '), ')'`, this.asText(table, column));
    }
    fromText(text) {
        return this.knex.raw('st_geomfromtext(?)', text);
    }
    asGeoJSON(table, column) {
        return this.knex.raw('st_asgeojson(??.??) as ??', [table, column, column]);
    }
}

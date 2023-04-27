import { GeometryHelper } from '../types.js';
export class GeometryHelperPostgres extends GeometryHelper {
    async supported() {
        const res = await this.knex.select('oid').from('pg_proc').where({ proname: 'postgis_version' });
        return res.length > 0;
    }
    createColumn(table, field) {
        const type = field.type.split('.')[1] ?? 'geometry';
        return table.specificType(field.field, `geometry(${type}, 4326)`);
    }
    _intersects_bbox(key, geojson) {
        const geometry = this.fromGeoJSON(geojson);
        return this.knex.raw('?? && ?', [key, geometry]);
    }
    asGeoJSON(table, column) {
        return this.knex.raw('st_asgeojson(??.??) as ??', [table, column, column]);
    }
}

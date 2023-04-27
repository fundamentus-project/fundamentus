import { GeometryHelper } from '../types.js';
export class GeometryHelperSQLite extends GeometryHelper {
    async supported() {
        const res = await this.knex.select('name').from('pragma_function_list').where({ name: 'spatialite_version' });
        return res.length > 0;
    }
    asGeoJSON(table, column) {
        return this.knex.raw('asgeojson(??.??) as ??', [table, column, column]);
    }
}

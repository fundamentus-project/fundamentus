import { FnHelper } from '../types.js';
const parseLocaltime = (columnType) => {
    if (columnType === 'timestamp') {
        return ` AT TIME ZONE 'UTC'`;
    }
    return '';
};
export class FnHelperPostgres extends FnHelper {
    year(table, column, options) {
        return this.knex.raw(`EXTRACT(YEAR FROM ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    month(table, column, options) {
        return this.knex.raw(`EXTRACT(MONTH FROM ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    week(table, column, options) {
        return this.knex.raw(`EXTRACT(WEEK FROM ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    day(table, column, options) {
        return this.knex.raw(`EXTRACT(DAY FROM ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    weekday(table, column, options) {
        return this.knex.raw(`EXTRACT(DOW FROM ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    hour(table, column, options) {
        return this.knex.raw(`EXTRACT(HOUR FROM ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    minute(table, column, options) {
        return this.knex.raw(`EXTRACT(MINUTE FROM ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    second(table, column, options) {
        return this.knex.raw(`EXTRACT(SECOND FROM ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    count(table, column, options) {
        const collectionName = options?.originalCollectionName || table;
        const type = this.schema.collections?.[collectionName]?.fields?.[column]?.type ?? 'unknown';
        if (type === 'json') {
            const { dbType } = this.schema.collections[table].fields[column];
            return this.knex.raw(dbType === 'jsonb' ? 'jsonb_array_length(??.??)' : 'json_array_length(??.??)', [
                table,
                column,
            ]);
        }
        if (type === 'alias') {
            return this._relationalCount(table, column, options);
        }
        throw new Error(`Couldn't extract type from ${table}.${column}`);
    }
}

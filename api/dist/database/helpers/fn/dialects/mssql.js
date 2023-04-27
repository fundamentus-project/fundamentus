import { FnHelper } from '../types.js';
const parseLocaltime = (columnType) => {
    if (columnType === 'timestamp') {
        return ` AT TIME ZONE 'UTC'`;
    }
    return '';
};
export class FnHelperMSSQL extends FnHelper {
    year(table, column, options) {
        return this.knex.raw(`DATEPART(year, ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    month(table, column, options) {
        return this.knex.raw(`DATEPART(month, ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    week(table, column, options) {
        return this.knex.raw(`DATEPART(week, ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    day(table, column, options) {
        return this.knex.raw(`DATEPART(day, ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    weekday(table, column, options) {
        return this.knex.raw(`DATEPART(weekday, ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    hour(table, column, options) {
        return this.knex.raw(`DATEPART(hour, ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    minute(table, column, options) {
        return this.knex.raw(`DATEPART(minute, ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    second(table, column, options) {
        return this.knex.raw(`DATEPART(second, ??.??${parseLocaltime(options?.type)})`, [table, column]);
    }
    count(table, column, options) {
        const collectionName = options?.originalCollectionName || table;
        const type = this.schema.collections?.[collectionName]?.fields?.[column]?.type ?? 'unknown';
        if (type === 'json') {
            return this.knex.raw(`(SELECT COUNT(*) FROM OPENJSON(??.??, '$'))`, [table, column]);
        }
        if (type === 'alias') {
            return this._relationalCount(table, column, options);
        }
        throw new Error(`Couldn't extract type from ${table}.${column}`);
    }
}

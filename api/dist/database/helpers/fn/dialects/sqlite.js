import { FnHelper } from '../types.js';
const parseLocaltime = (columnType) => {
    if (columnType === 'timestamp') {
        return '';
    }
    return `, 'localtime'`;
};
export class FnHelperSQLite extends FnHelper {
    year(table, column, options) {
        return this.knex.raw(`CAST(strftime('%Y', ??.?? / 1000, 'unixepoch'${parseLocaltime(options?.type)}) AS INTEGER)`, [
            table,
            column,
        ]);
    }
    month(table, column, options) {
        return this.knex.raw(`CAST(strftime('%m', ??.?? / 1000, 'unixepoch'${parseLocaltime(options?.type)}) AS INTEGER)`, [
            table,
            column,
        ]);
    }
    week(table, column, options) {
        return this.knex.raw(`CAST(strftime('%W', ??.?? / 1000, 'unixepoch'${parseLocaltime(options?.type)}) AS INTEGER)`, [
            table,
            column,
        ]);
    }
    day(table, column, options) {
        return this.knex.raw(`CAST(strftime('%d', ??.?? / 1000, 'unixepoch'${parseLocaltime(options?.type)}) AS INTEGER)`, [
            table,
            column,
        ]);
    }
    weekday(table, column, options) {
        return this.knex.raw(`CAST(strftime('%w', ??.?? / 1000, 'unixepoch'${parseLocaltime(options?.type)}) AS INTEGER)`, [
            table,
            column,
        ]);
    }
    hour(table, column, options) {
        return this.knex.raw(`CAST(strftime('%H', ??.?? / 1000, 'unixepoch'${parseLocaltime(options?.type)}) AS INTEGER)`, [
            table,
            column,
        ]);
    }
    minute(table, column, options) {
        return this.knex.raw(`CAST(strftime('%M', ??.?? / 1000, 'unixepoch'${parseLocaltime(options?.type)}) AS INTEGER)`, [
            table,
            column,
        ]);
    }
    second(table, column, options) {
        return this.knex.raw(`CAST(strftime('%S', ??.?? / 1000, 'unixepoch'${parseLocaltime(options?.type)}) AS INTEGER)`, [
            table,
            column,
        ]);
    }
    count(table, column, options) {
        const collectionName = options?.originalCollectionName || table;
        const type = this.schema.collections?.[collectionName]?.fields?.[column]?.type ?? 'unknown';
        if (type === 'json') {
            return this.knex.raw(`json_array_length(??.??, '$')`, [table, column]);
        }
        if (type === 'alias') {
            return this._relationalCount(table, column, options);
        }
        throw new Error(`Couldn't extract type from ${table}.${column}`);
    }
}

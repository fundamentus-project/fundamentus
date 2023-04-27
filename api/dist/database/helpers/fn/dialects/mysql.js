import { FnHelper } from '../types.js';
export class FnHelperMySQL extends FnHelper {
    year(table, column) {
        return this.knex.raw('YEAR(??.??)', [table, column]);
    }
    month(table, column) {
        return this.knex.raw('MONTH(??.??)', [table, column]);
    }
    week(table, column) {
        return this.knex.raw('WEEK(??.??)', [table, column]);
    }
    day(table, column) {
        return this.knex.raw('DAYOFMONTH(??.??)', [table, column]);
    }
    weekday(table, column) {
        return this.knex.raw('DAYOFWEEK(??.??)', [table, column]);
    }
    hour(table, column) {
        return this.knex.raw('HOUR(??.??)', [table, column]);
    }
    minute(table, column) {
        return this.knex.raw('MINUTE(??.??)', [table, column]);
    }
    second(table, column) {
        return this.knex.raw('SECOND(??.??)', [table, column]);
    }
    count(table, column, options) {
        const collectionName = options?.originalCollectionName || table;
        const type = this.schema.collections?.[collectionName]?.fields?.[column]?.type ?? 'unknown';
        if (type === 'json') {
            return this.knex.raw('JSON_LENGTH(??.??)', [table, column]);
        }
        if (type === 'alias') {
            return this._relationalCount(table, column, options);
        }
        throw new Error(`Couldn't extract type from ${table}.${column}`);
    }
}

import getDatabase from '../database/index.js';
import { ForbiddenException } from '../exceptions/index.js';
import { applyFilter, applySearch } from '../utils/apply-query.js';
export class MetaService {
    knex;
    accountability;
    schema;
    constructor(options) {
        this.knex = options.knex || getDatabase();
        this.accountability = options.accountability || null;
        this.schema = options.schema;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getMetaForQuery(collection, query) {
        if (!query || !query.meta)
            return;
        const results = await Promise.all(query.meta.map((metaVal) => {
            if (metaVal === 'total_count')
                return this.totalCount(collection);
            if (metaVal === 'filter_count')
                return this.filterCount(collection, query);
            return undefined;
        }));
        return results.reduce((metaObject, value, index) => {
            return {
                ...metaObject,
                [query.meta[index]]: value,
            };
        }, {});
    }
    async totalCount(collection) {
        const dbQuery = this.knex(collection).count('*', { as: 'count' }).first();
        if (this.accountability?.admin !== true) {
            const permissionsRecord = this.accountability?.permissions?.find((permission) => {
                return permission.action === 'read' && permission.collection === collection;
            });
            if (!permissionsRecord)
                throw new ForbiddenException();
            const permissions = permissionsRecord.permissions ?? {};
            applyFilter(this.knex, this.schema, dbQuery, permissions, collection, {});
        }
        const result = await dbQuery;
        return Number(result?.count ?? 0);
    }
    async filterCount(collection, query) {
        const dbQuery = this.knex(collection).count('*', { as: 'count' });
        let filter = query.filter || {};
        if (this.accountability?.admin !== true) {
            const permissionsRecord = this.accountability?.permissions?.find((permission) => {
                return permission.action === 'read' && permission.collection === collection;
            });
            if (!permissionsRecord)
                throw new ForbiddenException();
            const permissions = permissionsRecord.permissions ?? {};
            if (Object.keys(filter).length > 0) {
                filter = { _and: [permissions, filter] };
            }
            else {
                filter = permissions;
            }
        }
        if (Object.keys(filter).length > 0) {
            applyFilter(this.knex, this.schema, dbQuery, filter, collection, {});
        }
        if (query.search) {
            applySearch(this.schema, dbQuery, query.search, collection);
        }
        const records = await dbQuery;
        return Number(records[0].count);
    }
}

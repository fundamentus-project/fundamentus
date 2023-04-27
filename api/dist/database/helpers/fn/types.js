import { applyFilter } from '../../../utils/apply-query.js';
import { DatabaseHelper } from '../types.js';
export class FnHelper extends DatabaseHelper {
    schema;
    constructor(knex, schema) {
        super(knex);
        this.schema = schema;
        this.schema = schema;
    }
    _relationalCount(table, column, options) {
        const collectionName = options?.originalCollectionName || table;
        const relation = this.schema.relations.find((relation) => relation.related_collection === collectionName && relation?.meta?.one_field === column);
        const currentPrimary = this.schema.collections[collectionName].primary;
        if (!relation) {
            throw new Error(`Field ${collectionName}.${column} isn't a nested relational collection`);
        }
        let countQuery = this.knex
            .count('*')
            .from(relation.collection)
            .where(relation.field, '=', this.knex.raw(`??.??`, [table, currentPrimary]));
        if (options?.query?.filter) {
            countQuery = applyFilter(this.knex, this.schema, countQuery, options.query.filter, relation.collection, {}).query;
        }
        return this.knex.raw('(' + countQuery.toQuery() + ')');
    }
}

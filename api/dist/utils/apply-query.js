import { getFilterOperatorsForType, getOutputTypeForFunction } from '@directus/utils';
import { clone, isPlainObject } from 'lodash-es';
import validate from 'uuid-validate';
import { getHelpers } from '../database/helpers/index.js';
import { InvalidQueryException } from '../exceptions/invalid-query.js';
import { getColumnPath } from './get-column-path.js';
import { getColumn } from './get-column.js';
import { getRelationInfo } from './get-relation-info.js';
import { stripFunction } from './strip-function.js';
// @ts-ignore
import { customAlphabet } from 'nanoid/non-secure';
export const generateAlias = customAlphabet('abcdefghijklmnopqrstuvwxyz', 5);
/**
 * Apply the Query to a given Knex query builder instance
 */
export default function applyQuery(knex, collection, dbQuery, query, schema, options) {
    const aliasMap = options?.aliasMap ?? Object.create(null);
    let hasMultiRelationalFilter = false;
    applyLimit(knex, dbQuery, query.limit);
    if (query.offset) {
        applyOffset(knex, dbQuery, query.offset);
    }
    if (query.page && query.limit && query.limit !== -1) {
        applyOffset(knex, dbQuery, query.limit * (query.page - 1));
    }
    if (query.sort && !options?.isInnerQuery && !options?.hasMultiRelationalSort) {
        applySort(knex, schema, dbQuery, query.sort, collection, aliasMap);
    }
    if (query.search) {
        applySearch(schema, dbQuery, query.search, collection);
    }
    if (query.group) {
        dbQuery.groupBy(query.group.map((column) => getColumn(knex, collection, column, false, schema)));
    }
    if (query.aggregate) {
        applyAggregate(dbQuery, query.aggregate, collection);
    }
    if (query.filter) {
        hasMultiRelationalFilter = applyFilter(knex, schema, dbQuery, query.filter, collection, aliasMap).hasMultiRelationalFilter;
    }
    return { query: dbQuery, hasMultiRelationalFilter };
}
function addJoin({ path, collection, aliasMap, rootQuery, schema, relations, knex }) {
    let hasMultiRelational = false;
    path = clone(path);
    followRelation(path);
    return hasMultiRelational;
    function followRelation(pathParts, parentCollection = collection, parentFields) {
        /**
         * For A2M fields, the path can contain an optional collection scope <field>:<scope>
         */
        const pathRoot = pathParts[0].split(':')[0];
        const { relation, relationType } = getRelationInfo(relations, parentCollection, pathRoot);
        if (!relation) {
            return;
        }
        const existingAlias = parentFields
            ? aliasMap[`${parentFields}.${pathParts[0]}`]?.alias
            : aliasMap[pathParts[0]]?.alias;
        if (!existingAlias) {
            const alias = generateAlias();
            const aliasKey = parentFields ? `${parentFields}.${pathParts[0]}` : pathParts[0];
            const aliasedParentCollection = aliasMap[parentFields ?? '']?.alias || parentCollection;
            aliasMap[aliasKey] = { alias, collection: '' };
            if (relationType === 'm2o') {
                rootQuery.leftJoin({ [alias]: relation.related_collection }, `${aliasedParentCollection}.${relation.field}`, `${alias}.${schema.collections[relation.related_collection].primary}`);
                aliasMap[aliasKey].collection = relation.related_collection;
            }
            else if (relationType === 'a2o') {
                const pathScope = pathParts[0].split(':')[1];
                if (!pathScope) {
                    throw new InvalidQueryException(`You have to provide a collection scope when sorting or filtering on a many-to-any item`);
                }
                rootQuery.leftJoin({ [alias]: pathScope }, (joinClause) => {
                    joinClause
                        .onVal(relation.meta.one_collection_field, '=', pathScope)
                        .andOn(`${aliasedParentCollection}.${relation.field}`, '=', knex.raw(getHelpers(knex).schema.castA2oPrimaryKey(), `${alias}.${schema.collections[pathScope].primary}`));
                });
                aliasMap[aliasKey].collection = pathScope;
            }
            else if (relationType === 'o2a') {
                rootQuery.leftJoin({ [alias]: relation.collection }, (joinClause) => {
                    joinClause
                        .onVal(relation.meta.one_collection_field, '=', parentCollection)
                        .andOn(`${alias}.${relation.field}`, '=', knex.raw(getHelpers(knex).schema.castA2oPrimaryKey(), `${aliasedParentCollection}.${schema.collections[parentCollection].primary}`));
                });
                aliasMap[aliasKey].collection = relation.collection;
                hasMultiRelational = true;
            }
            else if (relationType === 'o2m') {
                rootQuery.leftJoin({ [alias]: relation.collection }, `${aliasedParentCollection}.${schema.collections[relation.related_collection].primary}`, `${alias}.${relation.field}`);
                aliasMap[aliasKey].collection = relation.collection;
                hasMultiRelational = true;
            }
        }
        let parent;
        if (relationType === 'm2o') {
            parent = relation.related_collection;
        }
        else if (relationType === 'a2o') {
            const pathScope = pathParts[0].split(':')[1];
            if (!pathScope) {
                throw new InvalidQueryException(`You have to provide a collection scope when sorting or filtering on a many-to-any item`);
            }
            parent = pathScope;
        }
        else {
            parent = relation.collection;
        }
        if (pathParts.length > 1) {
            followRelation(pathParts.slice(1), parent, `${parentFields ? parentFields + '.' : ''}${pathParts[0]}`);
        }
    }
}
export function applySort(knex, schema, rootQuery, rootSort, collection, aliasMap, returnRecords = false) {
    const relations = schema.relations;
    let hasMultiRelationalSort = false;
    const sortRecords = rootSort.map((sortField) => {
        const column = sortField.split('.');
        let order = 'asc';
        if (sortField.startsWith('-')) {
            order = 'desc';
        }
        if (column[0].startsWith('-')) {
            column[0] = column[0].substring(1);
        }
        if (column.length === 1) {
            const pathRoot = column[0].split(':')[0];
            const { relation, relationType } = getRelationInfo(relations, collection, pathRoot);
            if (!relation || ['m2o', 'a2o'].includes(relationType ?? '')) {
                return {
                    order,
                    column: returnRecords ? column[0] : getColumn(knex, collection, column[0], false, schema),
                };
            }
        }
        const hasMultiRelational = addJoin({
            path: column,
            collection,
            aliasMap,
            rootQuery,
            schema,
            relations,
            knex,
        });
        const { columnPath } = getColumnPath({
            path: column,
            collection,
            aliasMap,
            relations,
            schema,
        });
        const [alias, field] = columnPath.split('.');
        if (!hasMultiRelationalSort) {
            hasMultiRelationalSort = hasMultiRelational;
        }
        return {
            order,
            column: returnRecords ? columnPath : getColumn(knex, alias, field, false, schema),
        };
    });
    if (returnRecords)
        return { sortRecords, hasMultiRelationalSort };
    // Clears the order if any, eg: from MSSQL offset
    rootQuery.clear('order');
    rootQuery.orderBy(sortRecords);
    return undefined;
}
export function applyLimit(knex, rootQuery, limit) {
    if (typeof limit === 'number') {
        getHelpers(knex).schema.applyLimit(rootQuery, limit);
    }
}
export function applyOffset(knex, rootQuery, offset) {
    if (typeof offset === 'number') {
        getHelpers(knex).schema.applyOffset(rootQuery, offset);
    }
}
export function applyFilter(knex, schema, rootQuery, rootFilter, collection, aliasMap) {
    const helpers = getHelpers(knex);
    const relations = schema.relations;
    let hasMultiRelationalFilter = false;
    addJoins(rootQuery, rootFilter, collection);
    addWhereClauses(knex, rootQuery, rootFilter, collection);
    return { query: rootQuery, hasMultiRelationalFilter };
    function addJoins(dbQuery, filter, collection) {
        for (const [key, value] of Object.entries(filter)) {
            if (key === '_or' || key === '_and') {
                // If the _or array contains an empty object (full permissions), we should short-circuit and ignore all other
                // permission checks, as {} already matches full permissions.
                if (key === '_or' && value.some((subFilter) => Object.keys(subFilter).length === 0))
                    continue;
                value.forEach((subFilter) => {
                    addJoins(dbQuery, subFilter, collection);
                });
                continue;
            }
            const filterPath = getFilterPath(key, value);
            if (filterPath.length > 1 ||
                (!(key.includes('(') && key.includes(')')) && schema.collections[collection].fields[key].type === 'alias')) {
                const hasMultiRelational = addJoin({
                    path: filterPath,
                    collection,
                    knex,
                    schema,
                    relations,
                    rootQuery,
                    aliasMap,
                });
                if (!hasMultiRelationalFilter) {
                    hasMultiRelationalFilter = hasMultiRelational;
                }
            }
        }
    }
    function addWhereClauses(knex, dbQuery, filter, collection, logical = 'and') {
        for (const [key, value] of Object.entries(filter)) {
            if (key === '_or' || key === '_and') {
                // If the _or array contains an empty object (full permissions), we should short-circuit and ignore all other
                // permission checks, as {} already matches full permissions.
                if (key === '_or' && value.some((subFilter) => Object.keys(subFilter).length === 0)) {
                    continue;
                }
                /** @NOTE this callback function isn't called until Knex runs the query */
                dbQuery[logical].where((subQuery) => {
                    value.forEach((subFilter) => {
                        addWhereClauses(knex, subQuery, subFilter, collection, key === '_and' ? 'and' : 'or');
                    });
                });
                continue;
            }
            const filterPath = getFilterPath(key, value);
            /**
             * For A2M fields, the path can contain an optional collection scope <field>:<scope>
             */
            const pathRoot = filterPath[0].split(':')[0];
            const { relation, relationType } = getRelationInfo(relations, collection, pathRoot);
            const { operator: filterOperator, value: filterValue } = getOperation(key, value);
            if (filterPath.length > 1 ||
                (!(key.includes('(') && key.includes(')')) && schema.collections[collection].fields[key].type === 'alias')) {
                if (!relation)
                    continue;
                if (relationType === 'o2m' || relationType === 'o2a') {
                    let pkField = `${collection}.${schema.collections[relation.related_collection].primary}`;
                    if (relationType === 'o2a') {
                        pkField = knex.raw(getHelpers(knex).schema.castA2oPrimaryKey(), [pkField]);
                    }
                    const subQueryBuilder = (filter) => (subQueryKnex) => {
                        const field = relation.field;
                        const collection = relation.collection;
                        const column = `${collection}.${field}`;
                        subQueryKnex
                            .select({ [field]: column })
                            .from(collection)
                            .whereNotNull(column);
                        applyQuery(knex, relation.collection, subQueryKnex, { filter }, schema);
                    };
                    const childKey = Object.keys(value)?.[0];
                    if (childKey === '_none') {
                        dbQuery[logical].whereNotIn(pkField, subQueryBuilder(Object.values(value)[0]));
                        continue;
                    }
                    else if (childKey === '_some') {
                        dbQuery[logical].whereIn(pkField, subQueryBuilder(Object.values(value)[0]));
                        continue;
                    }
                }
                if (filterPath.includes('_none') || filterPath.includes('_some')) {
                    throw new InvalidQueryException(`"${filterPath.includes('_none') ? '_none' : '_some'}" can only be used with top level relational alias field`);
                }
                const { columnPath, targetCollection, addNestedPkField } = getColumnPath({
                    path: filterPath,
                    collection,
                    relations,
                    aliasMap,
                    schema,
                });
                if (addNestedPkField) {
                    filterPath.push(addNestedPkField);
                }
                if (!columnPath)
                    continue;
                const { type, special } = validateFilterField(schema.collections[targetCollection].fields, stripFunction(filterPath[filterPath.length - 1]), targetCollection);
                validateFilterOperator(type, filterOperator, special);
                applyFilterToQuery(columnPath, filterOperator, filterValue, logical, targetCollection);
            }
            else {
                const { type, special } = validateFilterField(schema.collections[collection].fields, stripFunction(filterPath[0]), collection);
                validateFilterOperator(type, filterOperator, special);
                applyFilterToQuery(`${collection}.${filterPath[0]}`, filterOperator, filterValue, logical);
            }
        }
        function validateFilterField(fields, key, collection = 'unknown') {
            if (fields[key] === undefined) {
                throw new InvalidQueryException(`Invalid filter key "${key}" on "${collection}"`);
            }
            return fields[key];
        }
        function validateFilterOperator(type, filterOperator, special) {
            if (filterOperator.startsWith('_')) {
                filterOperator = filterOperator.slice(1);
            }
            if (!getFilterOperatorsForType(type).includes(filterOperator)) {
                throw new InvalidQueryException(`"${type}" field type does not contain the "_${filterOperator}" filter operator`);
            }
            if (special.includes('conceal') &&
                !getFilterOperatorsForType('hash').includes(filterOperator)) {
                throw new InvalidQueryException(`Field with "conceal" special does not allow the "_${filterOperator}" filter operator`);
            }
        }
        function applyFilterToQuery(key, operator, compareValue, logical = 'and', originalCollectionName) {
            const [table, column] = key.split('.');
            // Is processed through Knex.Raw, so should be safe to string-inject into these where queries
            const selectionRaw = getColumn(knex, table, column, false, schema, { originalCollectionName });
            // Knex supports "raw" in the columnName parameter, but isn't typed as such. Too bad..
            // See https://github.com/knex/knex/issues/4518 @TODO remove as any once knex is updated
            // These operators don't rely on a value, and can thus be used without one (eg `?filter[field][_null]`)
            if (operator === '_null' || (operator === '_nnull' && compareValue === false)) {
                dbQuery[logical].whereNull(selectionRaw);
            }
            if (operator === '_nnull' || (operator === '_null' && compareValue === false)) {
                dbQuery[logical].whereNotNull(selectionRaw);
            }
            if (operator === '_empty' || (operator === '_nempty' && compareValue === false)) {
                dbQuery[logical].andWhere((query) => {
                    query.whereNull(key).orWhere(key, '=', '');
                });
            }
            if (operator === '_nempty' || (operator === '_empty' && compareValue === false)) {
                dbQuery[logical].andWhere((query) => {
                    query.whereNotNull(key).andWhere(key, '!=', '');
                });
            }
            // The following fields however, require a value to be run. If no value is passed, we
            // ignore them. This allows easier use in GraphQL, where you wouldn't be able to
            // conditionally build out your filter structure (#4471)
            if (compareValue === undefined)
                return;
            if (Array.isArray(compareValue)) {
                // Tip: when using a `[Type]` type in GraphQL, but don't provide the variable, it'll be
                // reported as [undefined].
                // We need to remove any undefined values, as they are useless
                compareValue = compareValue.filter((val) => val !== undefined);
            }
            // Cast filter value (compareValue) based on function used
            if (column.includes('(') && column.includes(')')) {
                const functionName = column.split('(')[0];
                const type = getOutputTypeForFunction(functionName);
                if (['bigInteger', 'integer', 'float', 'decimal'].includes(type)) {
                    compareValue = Number(compareValue);
                }
            }
            // Cast filter value (compareValue) based on type of field being filtered against
            const [collection, field] = key.split('.');
            const mappedCollection = (originalCollectionName || collection);
            if (mappedCollection in schema.collections && field in schema.collections[mappedCollection].fields) {
                const type = schema.collections[mappedCollection].fields[field].type;
                if (['date', 'dateTime', 'time', 'timestamp'].includes(type)) {
                    if (Array.isArray(compareValue)) {
                        compareValue = compareValue.map((val) => helpers.date.parse(val));
                    }
                    else {
                        compareValue = helpers.date.parse(compareValue);
                    }
                }
                if (['bigInteger', 'integer', 'float', 'decimal'].includes(type)) {
                    if (Array.isArray(compareValue)) {
                        compareValue = compareValue.map((val) => Number(val));
                    }
                    else {
                        compareValue = Number(compareValue);
                    }
                }
            }
            if (operator === '_eq') {
                dbQuery[logical].where(selectionRaw, '=', compareValue);
            }
            if (operator === '_neq') {
                dbQuery[logical].whereNot(selectionRaw, compareValue);
            }
            if (operator === '_ieq') {
                dbQuery[logical].whereRaw(`LOWER(??) = ?`, [selectionRaw, `${compareValue.toLowerCase()}`]);
            }
            if (operator === '_nieq') {
                dbQuery[logical].whereRaw(`LOWER(??) <> ?`, [selectionRaw, `${compareValue.toLowerCase()}`]);
            }
            if (operator === '_contains') {
                dbQuery[logical].where(selectionRaw, 'like', `%${compareValue}%`);
            }
            if (operator === '_ncontains') {
                dbQuery[logical].whereNot(selectionRaw, 'like', `%${compareValue}%`);
            }
            if (operator === '_icontains') {
                dbQuery[logical].whereRaw(`LOWER(??) LIKE ?`, [selectionRaw, `%${compareValue.toLowerCase()}%`]);
            }
            if (operator === '_nicontains') {
                dbQuery[logical].whereRaw(`LOWER(??) NOT LIKE ?`, [selectionRaw, `%${compareValue.toLowerCase()}%`]);
            }
            if (operator === '_starts_with') {
                dbQuery[logical].where(key, 'like', `${compareValue}%`);
            }
            if (operator === '_nstarts_with') {
                dbQuery[logical].whereNot(key, 'like', `${compareValue}%`);
            }
            if (operator === '_istarts_with') {
                dbQuery[logical].whereRaw(`LOWER(??) LIKE ?`, [selectionRaw, `${compareValue.toLowerCase()}%`]);
            }
            if (operator === '_nistarts_with') {
                dbQuery[logical].whereRaw(`LOWER(??) NOT LIKE ?`, [selectionRaw, `${compareValue.toLowerCase()}%`]);
            }
            if (operator === '_ends_with') {
                dbQuery[logical].where(key, 'like', `%${compareValue}`);
            }
            if (operator === '_nends_with') {
                dbQuery[logical].whereNot(key, 'like', `%${compareValue}`);
            }
            if (operator === '_iends_with') {
                dbQuery[logical].whereRaw(`LOWER(??) LIKE ?`, [selectionRaw, `%${compareValue.toLowerCase()}`]);
            }
            if (operator === '_niends_with') {
                dbQuery[logical].whereRaw(`LOWER(??) NOT LIKE ?`, [selectionRaw, `%${compareValue.toLowerCase()}`]);
            }
            if (operator === '_gt') {
                dbQuery[logical].where(selectionRaw, '>', compareValue);
            }
            if (operator === '_gte') {
                dbQuery[logical].where(selectionRaw, '>=', compareValue);
            }
            if (operator === '_lt') {
                dbQuery[logical].where(selectionRaw, '<', compareValue);
            }
            if (operator === '_lte') {
                dbQuery[logical].where(selectionRaw, '<=', compareValue);
            }
            if (operator === '_in') {
                let value = compareValue;
                if (typeof value === 'string')
                    value = value.split(',');
                dbQuery[logical].whereIn(selectionRaw, value);
            }
            if (operator === '_nin') {
                let value = compareValue;
                if (typeof value === 'string')
                    value = value.split(',');
                dbQuery[logical].whereNotIn(selectionRaw, value);
            }
            if (operator === '_between') {
                if (compareValue.length !== 2)
                    return;
                let value = compareValue;
                if (typeof value === 'string')
                    value = value.split(',');
                dbQuery[logical].whereBetween(selectionRaw, value);
            }
            if (operator === '_nbetween') {
                if (compareValue.length !== 2)
                    return;
                let value = compareValue;
                if (typeof value === 'string')
                    value = value.split(',');
                dbQuery[logical].whereNotBetween(selectionRaw, value);
            }
            if (operator == '_intersects') {
                dbQuery[logical].whereRaw(helpers.st.intersects(key, compareValue));
            }
            if (operator == '_nintersects') {
                dbQuery[logical].whereRaw(helpers.st.nintersects(key, compareValue));
            }
            if (operator == '_intersects_bbox') {
                dbQuery[logical].whereRaw(helpers.st.intersects_bbox(key, compareValue));
            }
            if (operator == '_nintersects_bbox') {
                dbQuery[logical].whereRaw(helpers.st.nintersects_bbox(key, compareValue));
            }
        }
    }
}
export async function applySearch(schema, dbQuery, searchQuery, collection) {
    const fields = Object.entries(schema.collections[collection].fields);
    dbQuery.andWhere(function () {
        fields.forEach(([name, field]) => {
            if (['text', 'string'].includes(field.type)) {
                this.orWhereRaw(`LOWER(??) LIKE ?`, [`${collection}.${name}`, `%${searchQuery.toLowerCase()}%`]);
            }
            else if (['bigInteger', 'integer', 'decimal', 'float'].includes(field.type)) {
                const number = Number(searchQuery);
                if (!isNaN(number))
                    this.orWhere({ [`${collection}.${name}`]: number });
            }
            else if (field.type === 'uuid' && validate(searchQuery)) {
                this.orWhere({ [`${collection}.${name}`]: searchQuery });
            }
        });
    });
}
export function applyAggregate(dbQuery, aggregate, collection) {
    for (const [operation, fields] of Object.entries(aggregate)) {
        if (!fields)
            continue;
        for (const field of fields) {
            if (operation === 'avg') {
                dbQuery.avg(`${collection}.${field}`, { as: `avg->${field}` });
            }
            if (operation === 'avgDistinct') {
                dbQuery.avgDistinct(`${collection}.${field}`, { as: `avgDistinct->${field}` });
            }
            if (operation === 'countAll') {
                dbQuery.count('*', { as: 'countAll' });
            }
            if (operation === 'count') {
                if (field === '*') {
                    dbQuery.count('*', { as: 'count' });
                }
                else {
                    dbQuery.count(`${collection}.${field}`, { as: `count->${field}` });
                }
            }
            if (operation === 'countDistinct') {
                dbQuery.countDistinct(`${collection}.${field}`, { as: `countDistinct->${field}` });
            }
            if (operation === 'sum') {
                dbQuery.sum(`${collection}.${field}`, { as: `sum->${field}` });
            }
            if (operation === 'sumDistinct') {
                dbQuery.sumDistinct(`${collection}.${field}`, { as: `sumDistinct->${field}` });
            }
            if (operation === 'min') {
                dbQuery.min(`${collection}.${field}`, { as: `min->${field}` });
            }
            if (operation === 'max') {
                dbQuery.max(`${collection}.${field}`, { as: `max->${field}` });
            }
        }
    }
}
function getFilterPath(key, value) {
    const path = [key];
    const childKey = Object.keys(value)[0];
    if (typeof childKey === 'string' && childKey.startsWith('_') === true && !['_none', '_some'].includes(childKey)) {
        return path;
    }
    if (isPlainObject(value)) {
        path.push(...getFilterPath(childKey, Object.values(value)[0]));
    }
    return path;
}
function getOperation(key, value) {
    if (key.startsWith('_') && !['_and', '_or', '_none', '_some'].includes(key)) {
        return { operator: key, value };
    }
    else if (isPlainObject(value) === false) {
        return { operator: '_eq', value };
    }
    return getOperation(Object.keys(value)[0], Object.values(value)[0]);
}

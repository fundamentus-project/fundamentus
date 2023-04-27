import { stripQuotes } from '../utils/strip-quotes.js';
export function rawColumnToColumn(rawColumn) {
    let dataType = rawColumn.COLUMN_TYPE.replace(/\(.*?\)/, '');
    if (rawColumn.COLUMN_TYPE.startsWith('tinyint(1)')) {
        dataType = 'boolean';
    }
    return {
        name: rawColumn.COLUMN_NAME,
        table: rawColumn.TABLE_NAME,
        data_type: dataType,
        default_value: parseDefaultValue(rawColumn.COLUMN_DEFAULT),
        generation_expression: rawColumn.GENERATION_EXPRESSION || null,
        max_length: rawColumn.CHARACTER_MAXIMUM_LENGTH,
        numeric_precision: rawColumn.NUMERIC_PRECISION,
        numeric_scale: rawColumn.NUMERIC_SCALE,
        is_generated: !!rawColumn.EXTRA?.endsWith('GENERATED'),
        is_nullable: rawColumn.IS_NULLABLE === 'YES',
        is_unique: rawColumn.COLUMN_KEY === 'UNI',
        is_primary_key: rawColumn.CONSTRAINT_NAME === 'PRIMARY' || rawColumn.COLUMN_KEY === 'PRI',
        has_auto_increment: rawColumn.EXTRA === 'auto_increment',
        foreign_key_column: rawColumn.REFERENCED_COLUMN_NAME,
        foreign_key_table: rawColumn.REFERENCED_TABLE_NAME,
        comment: rawColumn.COLUMN_COMMENT,
    };
}
export function parseDefaultValue(value) {
    if (value === null || value.trim().toLowerCase() === 'null')
        return null;
    return stripQuotes(value);
}
export default class MySQL {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    // Overview
    // ===============================================================================================
    async overview() {
        const columns = await this.knex.raw(`
			SELECT
				C.TABLE_NAME as table_name,
				C.COLUMN_NAME as column_name,
				C.COLUMN_DEFAULT as default_value,
				C.IS_NULLABLE as is_nullable,
				C.COLUMN_TYPE as data_type,
				C.COLUMN_KEY as column_key,
				C.CHARACTER_MAXIMUM_LENGTH as max_length,
				C.EXTRA as extra
			FROM
				INFORMATION_SCHEMA.COLUMNS AS C
			LEFT JOIN
				INFORMATION_SCHEMA.TABLES AS T ON C.TABLE_NAME = T.TABLE_NAME
				AND C.TABLE_SCHEMA = T.TABLE_SCHEMA
			WHERE
				T.TABLE_TYPE = 'BASE TABLE' AND
				C.TABLE_SCHEMA = ?;
			`, [this.knex.client.database()]);
        const overview = {};
        for (const column of columns[0]) {
            if (column.table_name in overview === false) {
                const primaryKeys = columns[0].filter((nested) => {
                    return nested.table_name === column.table_name && nested.column_key === 'PRI';
                });
                overview[column.table_name] = {
                    primary: primaryKeys.length !== 1 ? undefined : primaryKeys[0].column_name,
                    columns: {},
                };
            }
            let dataType = column.data_type.replace(/\(.*?\)/, '');
            if (column.data_type.startsWith('tinyint(1)')) {
                dataType = 'boolean';
            }
            overview[column.table_name].columns[column.column_name] = {
                ...column,
                default_value: column.extra === 'auto_increment' ? 'AUTO_INCREMENT' : parseDefaultValue(column.default_value),
                is_nullable: column.is_nullable === 'YES',
                is_generated: column.extra?.endsWith('GENERATED') ?? false,
                data_type: dataType,
            };
        }
        return overview;
    }
    // Tables
    // ===============================================================================================
    /**
     * List all existing tables in the current schema/database
     */
    async tables() {
        const records = await this.knex
            .select('TABLE_NAME')
            .from('INFORMATION_SCHEMA.TABLES')
            .where({
            TABLE_TYPE: 'BASE TABLE',
            TABLE_SCHEMA: this.knex.client.database(),
        });
        return records.map(({ TABLE_NAME }) => TABLE_NAME);
    }
    async tableInfo(table) {
        const query = this.knex
            .select('TABLE_NAME', 'ENGINE', 'TABLE_SCHEMA', 'TABLE_COLLATION', 'TABLE_COMMENT')
            .from('information_schema.tables')
            .where({
            table_schema: this.knex.client.database(),
            table_type: 'BASE TABLE',
        });
        if (table) {
            const rawTable = await query.andWhere({ table_name: table }).first();
            return {
                name: rawTable.TABLE_NAME,
                schema: rawTable.TABLE_SCHEMA,
                comment: rawTable.TABLE_COMMENT,
                collation: rawTable.TABLE_COLLATION,
                engine: rawTable.ENGINE,
            };
        }
        const records = await query;
        return records.map((rawTable) => {
            return {
                name: rawTable.TABLE_NAME,
                schema: rawTable.TABLE_SCHEMA,
                comment: rawTable.TABLE_COMMENT,
                collation: rawTable.TABLE_COLLATION,
                engine: rawTable.ENGINE,
            };
        });
    }
    /**
     * Check if a table exists in the current schema/database
     */
    async hasTable(table) {
        const result = await this.knex
            .count({ count: '*' })
            .from('information_schema.tables')
            .where({
            table_schema: this.knex.client.database(),
            table_name: table,
        })
            .first();
        return (result && result.count === 1) || false;
    }
    // Columns
    // ===============================================================================================
    /**
     * Get all the available columns in the current schema/database. Can be filtered to a specific table
     */
    async columns(table) {
        const query = this.knex
            .select('TABLE_NAME', 'COLUMN_NAME')
            .from('INFORMATION_SCHEMA.COLUMNS')
            .where({ TABLE_SCHEMA: this.knex.client.database() });
        if (table) {
            query.andWhere({ TABLE_NAME: table });
        }
        const records = await query;
        return records.map(({ TABLE_NAME, COLUMN_NAME }) => ({
            table: TABLE_NAME,
            column: COLUMN_NAME,
        }));
    }
    async columnInfo(table, column) {
        const query = this.knex
            .select('c.TABLE_NAME', 'c.COLUMN_NAME', 'c.COLUMN_DEFAULT', 'c.COLUMN_TYPE', 'c.CHARACTER_MAXIMUM_LENGTH', 'c.IS_NULLABLE', 'c.COLUMN_KEY', 'c.EXTRA', 'c.COLLATION_NAME', 'c.COLUMN_COMMENT', 'c.NUMERIC_PRECISION', 'c.NUMERIC_SCALE', 'c.GENERATION_EXPRESSION', 'fk.REFERENCED_TABLE_NAME', 'fk.REFERENCED_COLUMN_NAME', 'fk.CONSTRAINT_NAME', 'rc.UPDATE_RULE', 'rc.DELETE_RULE', 'rc.MATCH_OPTION')
            .from('INFORMATION_SCHEMA.COLUMNS as c')
            .leftJoin('INFORMATION_SCHEMA.KEY_COLUMN_USAGE as fk', function () {
            this.on('c.TABLE_NAME', '=', 'fk.TABLE_NAME')
                .andOn('fk.COLUMN_NAME', '=', 'c.COLUMN_NAME')
                .andOn('fk.CONSTRAINT_SCHEMA', '=', 'c.TABLE_SCHEMA');
        })
            .leftJoin('INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS as rc', function () {
            this.on('rc.TABLE_NAME', '=', 'fk.TABLE_NAME')
                .andOn('rc.CONSTRAINT_NAME', '=', 'fk.CONSTRAINT_NAME')
                .andOn('rc.CONSTRAINT_SCHEMA', '=', 'fk.CONSTRAINT_SCHEMA');
        })
            .where({
            'c.TABLE_SCHEMA': this.knex.client.database(),
        });
        if (table) {
            query.andWhere({ 'c.TABLE_NAME': table });
        }
        if (column) {
            const rawColumn = await query.andWhere({ 'c.column_name': column }).first();
            return rawColumnToColumn(rawColumn);
        }
        const records = await query;
        return records
            .map(rawColumnToColumn)
            .sort((column) => +!column.foreign_key_column)
            .filter((column, index, records) => {
            const first = records.findIndex((_column) => {
                return column.name === _column.name && column.table === _column.table;
            });
            return first === index;
        });
    }
    /**
     * Check if a table exists in the current schema/database
     */
    async hasColumn(table, column) {
        const result = await this.knex
            .count('*', { as: 'count' })
            .from('information_schema.columns')
            .where({
            table_schema: this.knex.client.database(),
            table_name: table,
            column_name: column,
        })
            .first();
        return !!(result && result.count);
    }
    /**
     * Get the primary key column for the given table
     */
    async primary(table) {
        const results = await this.knex.raw(`SHOW KEYS FROM ?? WHERE Key_name = 'PRIMARY'`, table);
        if (results && results.length && results[0].length) {
            return results[0][0]['Column_name'];
        }
        return null;
    }
    // Foreign Keys
    // ===============================================================================================
    async foreignKeys(table) {
        const result = await this.knex.raw(`
		 SELECT DISTINCT
			rc.TABLE_NAME AS 'table',
			kcu.COLUMN_NAME AS 'column',
			rc.REFERENCED_TABLE_NAME AS 'foreign_key_table',
			kcu.REFERENCED_COLUMN_NAME AS 'foreign_key_column',
			rc.CONSTRAINT_NAME AS 'constraint_name',
			rc.UPDATE_RULE AS on_update,
			rc.DELETE_RULE AS on_delete
		 FROM
			information_schema.referential_constraints AS rc
		 JOIN information_schema.key_column_usage AS kcu ON
			rc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
			AND kcu.CONSTRAINT_SCHEMA = rc.CONSTRAINT_SCHEMA
		 WHERE
			rc.CONSTRAINT_SCHEMA = ?;
	  `, [this.knex.client.database()]);
        // Mapping casts "RowDataPacket" object from mysql to plain JS object
        if (table) {
            return result?.[0]?.filter((row) => row.table === table).map((row) => ({ ...row })) ?? [];
        }
        return result?.[0]?.map((row) => ({ ...row })) ?? [];
    }
}

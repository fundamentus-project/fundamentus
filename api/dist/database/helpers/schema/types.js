import { getDatabaseClient } from '../../index.js';
import { DatabaseHelper } from '../types.js';
export class SchemaHelper extends DatabaseHelper {
    isOneOfClients(clients) {
        return clients.includes(getDatabaseClient(this.knex));
    }
    async changeNullable(table, column, nullable) {
        await this.knex.schema.alterTable(table, (builder) => {
            if (nullable) {
                builder.setNullable(column);
            }
            else {
                builder.dropNullable(column);
            }
        });
    }
    async changeToType(table, column, type, options = {}) {
        await this.knex.schema.alterTable(table, (builder) => {
            const b = type === 'string' ? builder.string(column, options.length) : builder[type](column);
            if (options.nullable === true) {
                b.nullable();
            }
            if (options.nullable === false) {
                b.notNullable();
            }
            if (options.default !== undefined) {
                b.defaultTo(options.default);
            }
            b.alter();
        });
    }
    async changeToTypeByCopy(table, column, type, options) {
        const tempName = `${column}__temp`;
        await this.knex.schema.alterTable(table, (builder) => {
            const col = type === 'string' ? builder.string(tempName, options.length) : builder[type](tempName);
            if (options.default !== undefined) {
                col.defaultTo(options.default);
            }
            // Force new temporary column to be nullable (required, as there will already be rows in
            // the table)
            col.nullable();
        });
        await this.knex(table).update(tempName, this.knex.ref(column));
        await this.knex.schema.alterTable(table, (builder) => {
            builder.dropColumn(column);
        });
        await this.knex.schema.alterTable(table, (builder) => {
            builder.renameColumn(tempName, column);
        });
        // We're altering the temporary column here. That starts nullable, so we only want to set it
        // to NOT NULL when applicable
        if (options.nullable === false) {
            await this.changeNullable(table, column, options.nullable);
        }
    }
    async preColumnChange() {
        return false;
    }
    async postColumnChange() {
        return;
    }
    preRelationChange(_relation) {
        return;
    }
    processFieldType(field) {
        return field.type;
    }
    constraintName(existingName) {
        // most vendors allow for dropping/creating constraints with the same name
        // reference issue #14873
        return existingName;
    }
    applyLimit(rootQuery, limit) {
        if (limit !== -1) {
            rootQuery.limit(limit);
        }
    }
    applyOffset(rootQuery, offset) {
        rootQuery.offset(offset);
    }
    castA2oPrimaryKey() {
        return 'CAST(?? AS CHAR(255))';
    }
    applyMultiRelationalSort(knex, dbQuery, table, primaryKey, orderByString, orderByFields) {
        dbQuery.rowNumber(knex.ref('directus_row_number').toQuery(), knex.raw(`partition by ?? order by ${orderByString}`, [`${table}.${primaryKey}`, ...orderByFields]));
        return dbQuery;
    }
    formatUUID(uuid) {
        return uuid; // no-op by default
    }
}

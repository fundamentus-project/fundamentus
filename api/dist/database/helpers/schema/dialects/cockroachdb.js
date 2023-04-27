import { SchemaHelper } from '../types.js';
export class SchemaHelperCockroachDb extends SchemaHelper {
    async changeToType(table, column, type, options = {}) {
        await this.changeToTypeByCopy(table, column, type, options);
    }
    constraintName(existingName) {
        const suffix = '_replaced';
        // CockroachDB does not allow for dropping/creating constraints with the same
        // name in a single transaction. reference issue #14873
        if (existingName.endsWith(suffix)) {
            return existingName.substring(0, existingName.length - suffix.length);
        }
        else {
            return existingName + suffix;
        }
    }
}

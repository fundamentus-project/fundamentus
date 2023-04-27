import { SchemaHelper } from '../types.js';
export class SchemaHelperSQLite extends SchemaHelper {
    async preColumnChange() {
        const foreignCheckStatus = (await this.knex.raw('PRAGMA foreign_keys'))[0].foreign_keys === 1;
        if (foreignCheckStatus) {
            await this.knex.raw('PRAGMA foreign_keys = OFF');
        }
        return foreignCheckStatus;
    }
    async postColumnChange() {
        await this.knex.raw('PRAGMA foreign_keys = ON');
    }
}

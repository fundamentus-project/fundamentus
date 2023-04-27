import { SchemaHelper } from '../types.js';
export class SchemaHelperMSSQL extends SchemaHelper {
    applyLimit(rootQuery, limit) {
        // The ORDER BY clause is invalid in views, inline functions, derived tables, subqueries,
        // and common table expressions, unless TOP, OFFSET or FOR XML is also specified.
        if (limit === -1) {
            rootQuery.limit(Number.MAX_SAFE_INTEGER);
        }
        else {
            rootQuery.limit(limit);
        }
    }
    applyOffset(rootQuery, offset) {
        rootQuery.offset(offset);
        rootQuery.orderBy(1);
    }
    formatUUID(uuid) {
        return uuid.toUpperCase();
    }
}

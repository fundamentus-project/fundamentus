import { ContainsNullValuesException } from '../contains-null-values.js';
import { InvalidForeignKeyException } from '../invalid-foreign-key.js';
import { NotNullViolationException } from '../not-null-violation.js';
import { RecordNotUniqueException } from '../record-not-unique.js';
import { ValueOutOfRangeException } from '../value-out-of-range.js';
import { ValueTooLongException } from '../value-too-long.js';
var PostgresErrorCodes;
(function (PostgresErrorCodes) {
    PostgresErrorCodes["FOREIGN_KEY_VIOLATION"] = "23503";
    PostgresErrorCodes["NOT_NULL_VIOLATION"] = "23502";
    PostgresErrorCodes["NUMERIC_VALUE_OUT_OF_RANGE"] = "22003";
    PostgresErrorCodes["UNIQUE_VIOLATION"] = "23505";
    PostgresErrorCodes["VALUE_LIMIT_VIOLATION"] = "22001";
})(PostgresErrorCodes || (PostgresErrorCodes = {}));
export function extractError(error) {
    switch (error.code) {
        case PostgresErrorCodes.UNIQUE_VIOLATION:
            return uniqueViolation(error);
        case PostgresErrorCodes.NUMERIC_VALUE_OUT_OF_RANGE:
            return numericValueOutOfRange(error);
        case PostgresErrorCodes.VALUE_LIMIT_VIOLATION:
            return valueLimitViolation(error);
        case PostgresErrorCodes.NOT_NULL_VIOLATION:
            return notNullViolation(error);
        case PostgresErrorCodes.FOREIGN_KEY_VIOLATION:
            return foreignKeyViolation(error);
        default:
            return error;
    }
}
function uniqueViolation(error) {
    const { table, detail } = error;
    const betweenParens = /\(([^)]+)\)/g;
    const matches = detail.match(betweenParens);
    if (!matches)
        return error;
    const collection = table;
    const field = matches[0].slice(1, -1);
    const invalid = matches[1].slice(1, -1);
    return new RecordNotUniqueException(field, {
        collection,
        field,
        invalid,
    });
}
function numericValueOutOfRange(error) {
    const regex = /"(.*?)"/g;
    const matches = error.message.match(regex);
    if (!matches)
        return error;
    const collection = matches[0].slice(1, -1);
    const field = null;
    const invalid = matches[2].slice(1, -1);
    return new ValueOutOfRangeException(field, {
        collection,
        field,
        invalid,
    });
}
function valueLimitViolation(error) {
    /**
     * NOTE:
     * Postgres doesn't return the offending column
     */
    const regex = /"(.*?)"/g;
    const matches = error.message.match(regex);
    if (!matches)
        return error;
    const collection = matches[0].slice(1, -1);
    const field = null;
    return new ValueTooLongException(field, {
        collection,
        field,
    });
}
function notNullViolation(error) {
    const { table, column } = error;
    if (!column)
        return error;
    if (error.message.endsWith('contains null values')) {
        return new ContainsNullValuesException(column, { collection: table, field: column });
    }
    return new NotNullViolationException(column, {
        collection: table,
        field: column,
    });
}
function foreignKeyViolation(error) {
    const { table, detail } = error;
    const betweenParens = /\(([^)]+)\)/g;
    const matches = detail.match(betweenParens);
    if (!matches)
        return error;
    const collection = table;
    const field = matches[0].slice(1, -1);
    const invalid = matches[1].slice(1, -1);
    return new InvalidForeignKeyException(field, {
        collection,
        field,
        invalid,
    });
}

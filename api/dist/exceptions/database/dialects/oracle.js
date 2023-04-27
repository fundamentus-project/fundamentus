import { ContainsNullValuesException } from '../contains-null-values.js';
var OracleErrorCodes;
(function (OracleErrorCodes) {
    OracleErrorCodes[OracleErrorCodes["CONTAINS_NULL_VALUES"] = 2296] = "CONTAINS_NULL_VALUES";
    // @TODO extend with other errors
})(OracleErrorCodes || (OracleErrorCodes = {}));
export function extractError(error) {
    switch (error.errorNum) {
        case OracleErrorCodes.CONTAINS_NULL_VALUES:
            return containsNullValues(error);
        default:
            return error;
    }
}
function containsNullValues(error) {
    const betweenQuotes = /"([^"]+)"/g;
    const matches = error.message.match(betweenQuotes);
    if (!matches)
        return error;
    const collection = matches[0].slice(1, -1);
    const field = matches[1].slice(1, -1);
    return new ContainsNullValuesException(field, { collection, field });
}

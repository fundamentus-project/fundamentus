/**
 * Add a flag to a field.
 */
export function addFieldFlag(field, flag) {
    if (!field.meta) {
        field.meta = {
            special: [flag],
        };
    }
    else if (!field.meta.special) {
        field.meta.special = [flag];
    }
    else if (!field.meta.special.includes(flag)) {
        field.meta.special.push(flag);
    }
}

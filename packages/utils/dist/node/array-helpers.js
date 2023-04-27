export function isIn(value, array) {
    return array.includes(value);
}
export function isTypeIn(object, array) {
    if (!object.type)
        return false;
    return array.includes(object.type);
}

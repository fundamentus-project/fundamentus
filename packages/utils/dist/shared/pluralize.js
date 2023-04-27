export function pluralize(str) {
    return `${str}s`;
}
export function depluralize(str) {
    return str.slice(0, -1);
}

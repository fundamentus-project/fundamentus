export function toArray(val) {
    if (typeof val === 'string') {
        return val.split(',');
    }
    return Array.isArray(val) ? val : [val];
}

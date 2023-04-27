export function getOutputTypeForFunction(fn) {
    const typeMap = {
        year: 'integer',
        month: 'integer',
        week: 'integer',
        day: 'integer',
        weekday: 'integer',
        hour: 'integer',
        minute: 'integer',
        second: 'integer',
        count: 'integer',
    };
    return typeMap[fn];
}

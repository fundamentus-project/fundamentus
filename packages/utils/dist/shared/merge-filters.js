export function mergeFilters(filterA, filterB, strategy = 'and') {
    if (!filterA)
        return filterB;
    if (!filterB)
        return filterA;
    return {
        [`_${strategy}`]: [filterA, filterB],
    };
}

/**
 * Parse count(a.b.c) as a.b.count(c) and a.b.count(c.d) as a.b.c.count(d)
 */
export declare function parseFilterFunctionPath(path: string): string;

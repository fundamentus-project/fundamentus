/**
 * Run JSON.parse, but ignore `__proto__` properties. This prevents prototype pollution attacks
 */
export declare function parseJSON(input: string): any;
export declare function noproto<T>(key: string, value: T): T | void;

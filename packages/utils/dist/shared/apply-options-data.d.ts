export declare function applyOptionsData(options: Record<string, any>, data: Record<string, any>, skipUndefinedKeys?: string[]): Record<string, any>;
export declare function optionToObject<T>(option: T): Exclude<T, string>;
export declare function optionToString(option: unknown): string;

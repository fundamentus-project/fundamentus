export declare function isIn<T extends readonly string[]>(value: string, array: T): value is T[number];
export declare function isTypeIn<T extends {
    type?: string;
}, E extends string>(object: T, array: readonly E[]): object is Extract<T, {
    type?: E;
}>;

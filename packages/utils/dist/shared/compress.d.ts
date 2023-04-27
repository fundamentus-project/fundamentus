declare const enum Tokens {
    'TRUE' = -1,
    'FALSE' = -2,
    'NULL' = -3,
    'EMPTY' = -4,
    'UNDEFINED' = -5
}
/**
 * Compress any input object or array down to a minimal size reproduction in a string
 * Inspired by `jsonpack`
 */
export declare function compress(obj: Record<string, any> | Record<string, any>[]): string;
export declare function decompress(input: string): unknown;
export declare function mapToSortedArray(map: Map<string | number, number>): (string | number)[];
export declare function encode(str: string): string;
export declare function decode(str: string): string;
export declare function to36(num: number): string;
export declare function to10(str: string): number;
export declare function getValueForToken(token: Tokens): boolean | "" | null | undefined;
export {};

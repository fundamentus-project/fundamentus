/**
 * Replace windows style backslashes with unix forwards slashes
 */
export declare const normalizePath: (path: string, { removeLeading }?: {
    removeLeading: boolean;
}) => string;

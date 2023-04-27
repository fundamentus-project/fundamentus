export declare class Url {
    protocol: string | null;
    host: string | null;
    port: string | null;
    path: string[];
    query: Record<string, string>;
    hash: string | null;
    constructor(url: string);
    isAbsolute(): boolean;
    isProtocolRelative(): boolean;
    isRootRelative(): boolean;
    addPath(...paths: (string | number)[]): Url;
    setQuery(key: string, value: string): Url;
    toString({ rootRelative }?: {
        rootRelative: boolean;
    }): string;
}

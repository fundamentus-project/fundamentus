/**
 * Check if a given package version is the most up to date release of that package. Returns the
 * latest version string if package is not up to date, returns null if package is up to date.
 */
export declare const isUpToDate: (name: string, version: string) => Promise<string | null>;

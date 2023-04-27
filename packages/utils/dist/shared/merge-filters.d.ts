import type { Filter } from '@directus/types';
export declare function mergeFilters(filterA: Filter | null, filterB: Filter | null, strategy?: 'and' | 'or'): Filter | null;

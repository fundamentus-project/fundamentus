import type { Filter } from '@directus/types';
/**
 * Inject function output fields into a given payload for accurate validation
 *
 * @param payload Any data payload
 * @param filter A single level filter rule to verify against
 *
 * @example
 * ```js
 * const input = { date: '2022-03-29T11:37:56Z' };
 * const filter = { 'year(date)': { _eq: 2022 }}
 * const output = applyFunctions(input, filter);
 * // { date: '2022-03-29T11:37:56Z', 'year(date)': 2022 }
 * ```
 */
export declare function injectFunctionResults(payload: Record<string, any>, filter: Filter): Record<string, any>;

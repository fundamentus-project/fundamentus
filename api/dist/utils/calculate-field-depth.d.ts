/**
 * Calculates the depth of a given JSON structure, not counting any _ prefixed properties
 *
 * Used to calculate the field depth in a filter or deep query structure
 *
 * @example
 *
 * ```js
 * const deep = {
 * 	translations: {
 * 		_filter: {
 * 			_and: [
 * 				{
 * 					language_id: {
 * 						name: {
 * 							_eq: 'English'
 * 						}
 * 					}
 * 				},
 * 				{
 * 					status: {
 * 						_eq: 'Published'
 * 					}
 * 				}
 * 			]
 * 		}
 * 	}
 * };
 *
 * const result = calculateFieldDepth(deep); // => 3
 * ```
 */
export declare function calculateFieldDepth(obj?: Record<string, any> | null, dotNotationKeys?: string[]): number;

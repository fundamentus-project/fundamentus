/**
 * Set req.collection for use in other middleware. Used as an alternative on validate-collection for
 * system collections
 */
import type { RequestHandler } from 'express';
declare const useCollection: (collection: string) => RequestHandler;
export default useCollection;

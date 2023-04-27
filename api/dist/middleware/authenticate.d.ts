/// <reference types="qs" />
import type { NextFunction, Request, Response } from 'express';
/**
 * Verify the passed JWT and assign the user ID and role to `req`
 */
export declare const handler: (req: Request, _res: Response, next: NextFunction) => Promise<void>;
declare const _default: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
export default _default;

/// <reference types="qs" />
/// <reference types="express" />
export declare const validateBatch: (scope: 'read' | 'update' | 'delete') => (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction) => Promise<void>;

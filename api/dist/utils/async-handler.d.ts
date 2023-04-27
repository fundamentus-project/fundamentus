import type { RequestHandler, Request, Response, NextFunction } from 'express';
declare const asyncHandler: (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default asyncHandler;

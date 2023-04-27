import '../../src/types/express.d.ts';
import asyncHandler from './async-handler.js';
import { expect, vi, test } from 'vitest';
let mockRequest;
let mockResponse;
const nextFunction = vi.fn();
test('Wraps async middleware in Promise resolve that will catch rejects and pass them to the nextFn', async () => {
    const err = new Error('testing');
    const middleware = async (_req, _res, _next) => {
        throw err;
    };
    await asyncHandler(middleware)(mockRequest, mockResponse, nextFunction);
    expect(nextFunction).toHaveBeenCalledWith(err);
});

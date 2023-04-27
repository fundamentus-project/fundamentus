import { beforeEach, expect, test, vi } from 'vitest';
import extractToken from '../../src/middleware/extract-token.js';
import '../../src/types/express.d.ts';
let mockRequest;
let mockResponse;
const nextFunction = vi.fn();
beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    vi.clearAllMocks();
});
test('Token from query', () => {
    mockRequest = {
        query: {
            access_token: 'test',
        },
    };
    extractToken(mockRequest, mockResponse, nextFunction);
    expect(mockRequest.token).toBe('test');
    expect(nextFunction).toBeCalledTimes(1);
});
test('Token from Authorization header (capitalized)', () => {
    mockRequest = {
        headers: {
            authorization: 'Bearer test',
        },
    };
    extractToken(mockRequest, mockResponse, nextFunction);
    expect(mockRequest.token).toBe('test');
    expect(nextFunction).toBeCalledTimes(1);
});
test('Token from Authorization header (lowercase)', () => {
    mockRequest = {
        headers: {
            authorization: 'bearer test',
        },
    };
    extractToken(mockRequest, mockResponse, nextFunction);
    expect(mockRequest.token).toBe('test');
    expect(nextFunction).toBeCalledTimes(1);
});
test('Ignore the token if authorization header is too many parts', () => {
    mockRequest = {
        headers: {
            authorization: 'bearer test what another one',
        },
    };
    extractToken(mockRequest, mockResponse, nextFunction);
    expect(mockRequest.token).toBeNull();
    expect(nextFunction).toBeCalledTimes(1);
});
test('Null if no token passed', () => {
    extractToken(mockRequest, mockResponse, nextFunction);
    expect(mockRequest.token).toBeNull();
    expect(nextFunction).toBeCalledTimes(1);
});

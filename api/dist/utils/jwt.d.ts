import type { DirectusTokenPayload } from '../types/index.js';
export declare function verifyJWT(token: string, secret: string): Record<string, any>;
export declare function verifyAccessJWT(token: string, secret: string): DirectusTokenPayload;

/**
 * Extract access token from:
 *
 * Authorization: Bearer
 * access_token query parameter
 *
 * and store in req.token
 */
import type { RequestHandler } from 'express';
declare const extractToken: RequestHandler;
export default extractToken;

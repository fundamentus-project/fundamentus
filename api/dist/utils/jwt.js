import jwt from 'jsonwebtoken';
import { InvalidTokenException, ServiceUnavailableException, TokenExpiredException } from '../exceptions/index.js';
export function verifyJWT(token, secret) {
    let payload;
    try {
        payload = jwt.verify(token, secret, {
            issuer: 'directus',
        });
    }
    catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            throw new TokenExpiredException();
        }
        else if (err instanceof jwt.JsonWebTokenError) {
            throw new InvalidTokenException('Token invalid.');
        }
        else {
            throw new ServiceUnavailableException(`Couldn't verify token.`, { service: 'jwt' });
        }
    }
    return payload;
}
export function verifyAccessJWT(token, secret) {
    const { id, role, app_access, admin_access, share, share_scope } = verifyJWT(token, secret);
    if (role === undefined || app_access === undefined || admin_access === undefined) {
        throw new InvalidTokenException('Invalid token payload.');
    }
    return { id, role, app_access, admin_access, share, share_scope };
}

import { Router } from 'express';
import Joi from 'joi';
import ldap from 'ldapjs';
import getDatabase from '../../database/index.js';
import emitter from '../../emitter.js';
import env from '../../env.js';
import { RecordNotUniqueException } from '../../exceptions/database/record-not-unique.js';
import { InvalidConfigException, InvalidCredentialsException, InvalidPayloadException, InvalidProviderException, ServiceUnavailableException, UnexpectedResponseException, } from '../../exceptions/index.js';
import logger from '../../logger.js';
import { respond } from '../../middleware/respond.js';
import { AuthenticationService } from '../../services/authentication.js';
import { UsersService } from '../../services/users.js';
import asyncHandler from '../../utils/async-handler.js';
import { getIPFromReq } from '../../utils/get-ip-from-req.js';
import { getMilliseconds } from '../../utils/get-milliseconds.js';
import { AuthDriver } from '../auth.js';
// 0x2: ACCOUNTDISABLE
// 0x10: LOCKOUT
// 0x800000: PASSWORD_EXPIRED
const INVALID_ACCOUNT_FLAGS = 0x800012;
export class LDAPAuthDriver extends AuthDriver {
    bindClient;
    usersService;
    config;
    constructor(options, config) {
        super(options, config);
        const { bindDn, bindPassword, userDn, provider, clientUrl } = config;
        if (bindDn === undefined ||
            bindPassword === undefined ||
            !userDn ||
            !provider ||
            (!clientUrl && !config['client']?.socketPath)) {
            throw new InvalidConfigException('Invalid provider config', { provider });
        }
        const clientConfig = typeof config['client'] === 'object' ? config['client'] : {};
        this.bindClient = ldap.createClient({ url: clientUrl, reconnect: true, ...clientConfig });
        this.bindClient.on('error', (err) => {
            logger.warn(err);
        });
        this.usersService = new UsersService({ knex: this.knex, schema: this.schema });
        this.config = config;
    }
    async validateBindClient() {
        const { bindDn, bindPassword, provider } = this.config;
        return new Promise((resolve, reject) => {
            // Healthcheck bind user
            this.bindClient.search(bindDn, {}, (err, res) => {
                if (err) {
                    reject(handleError(err));
                    return;
                }
                res.on('searchEntry', () => {
                    resolve();
                });
                res.on('error', () => {
                    // Attempt to rebind on search error
                    this.bindClient.bind(bindDn, bindPassword, (err) => {
                        if (err) {
                            const error = handleError(err);
                            if (error instanceof InvalidCredentialsException) {
                                reject(new InvalidConfigException('Invalid bind user', { provider }));
                            }
                            else {
                                reject(error);
                            }
                        }
                        else {
                            resolve();
                        }
                    });
                });
                res.on('end', (result) => {
                    // Handle edge case where authenticated bind user cannot read their own DN
                    if (result?.status === 0) {
                        reject(new UnexpectedResponseException('Failed to find bind user record'));
                    }
                });
            });
        });
    }
    async fetchUserInfo(baseDn, filter, scope) {
        let { firstNameAttribute, lastNameAttribute, mailAttribute } = this.config;
        firstNameAttribute ??= 'givenName';
        lastNameAttribute ??= 'sn';
        mailAttribute ??= 'mail';
        return new Promise((resolve, reject) => {
            // Search for the user in LDAP by filter
            this.bindClient.search(baseDn, {
                filter,
                scope,
                attributes: ['uid', firstNameAttribute, lastNameAttribute, mailAttribute, 'userAccountControl'],
            }, (err, res) => {
                if (err) {
                    reject(handleError(err));
                    return;
                }
                res.on('searchEntry', ({ object }) => {
                    const user = {
                        dn: object['dn'],
                        userAccountControl: Number(getEntryValue(object['userAccountControl']) ?? 0),
                    };
                    const firstName = getEntryValue(object[firstNameAttribute]);
                    if (firstName)
                        user.firstName = firstName;
                    const lastName = getEntryValue(object[lastNameAttribute]);
                    if (lastName)
                        user.lastName = lastName;
                    const email = getEntryValue(object[mailAttribute]);
                    if (email)
                        user.email = email;
                    const uid = getEntryValue(object['uid']);
                    if (uid)
                        user.uid = uid;
                    resolve(user);
                });
                res.on('error', (err) => {
                    reject(handleError(err));
                });
                res.on('end', () => {
                    resolve(undefined);
                });
            });
        });
    }
    async fetchUserGroups(baseDn, filter, scope) {
        return new Promise((resolve, reject) => {
            let userGroups = [];
            // Search for the user info in LDAP by group attribute
            this.bindClient.search(baseDn, {
                filter,
                scope,
                attributes: ['cn'],
            }, (err, res) => {
                if (err) {
                    reject(handleError(err));
                    return;
                }
                res.on('searchEntry', ({ object }) => {
                    if (typeof object['cn'] === 'object') {
                        userGroups = [...userGroups, ...object['cn']];
                    }
                    else if (object['cn']) {
                        userGroups.push(object['cn']);
                    }
                });
                res.on('error', (err) => {
                    reject(handleError(err));
                });
                res.on('end', () => {
                    resolve(userGroups);
                });
            });
        });
    }
    async fetchUserId(userDn) {
        const user = await this.knex
            .select('id')
            .from('directus_users')
            .orWhereRaw('LOWER(??) = ?', ['external_identifier', userDn.toLowerCase()])
            .first();
        return user?.id;
    }
    async getUserID(payload) {
        if (!payload['identifier']) {
            throw new InvalidCredentialsException();
        }
        await this.validateBindClient();
        const { userDn, userScope, userAttribute, groupDn, groupScope, groupAttribute, defaultRoleId } = this.config;
        const userInfo = await this.fetchUserInfo(userDn, new ldap.EqualityFilter({
            attribute: userAttribute ?? 'cn',
            value: payload['identifier'],
        }), userScope ?? 'one');
        if (!userInfo?.dn) {
            throw new InvalidCredentialsException();
        }
        let userRole;
        if (groupDn) {
            const userGroups = await this.fetchUserGroups(groupDn, new ldap.EqualityFilter({
                attribute: groupAttribute ?? 'member',
                value: groupAttribute?.toLowerCase() === 'memberuid' && userInfo.uid ? userInfo.uid : userInfo.dn,
            }), groupScope ?? 'one');
            if (userGroups.length) {
                userRole = await this.knex
                    .select('id')
                    .from('directus_roles')
                    .whereRaw(`LOWER(??) IN (${userGroups.map(() => '?')})`, [
                    'name',
                    ...userGroups.map((group) => group.toLowerCase()),
                ])
                    .first();
            }
        }
        const userId = await this.fetchUserId(userInfo.dn);
        if (userId) {
            // Run hook so the end user has the chance to augment the
            // user that is about to be updated
            let updatedUserPayload = await emitter.emitFilter(`auth.update`, {}, { identifier: userInfo.dn, provider: this.config['provider'], providerPayload: { userInfo, userRole } }, { database: getDatabase(), schema: this.schema, accountability: null });
            // Only sync roles if the AD groups are configured
            if (groupDn) {
                updatedUserPayload = { role: userRole?.id ?? defaultRoleId ?? null, ...updatedUserPayload };
            }
            // Update user to update properties that might have changed
            await this.usersService.updateOne(userId, updatedUserPayload);
            return userId;
        }
        if (!userInfo) {
            throw new InvalidCredentialsException();
        }
        const userPayload = {
            provider: this.config['provider'],
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            email: userInfo.email,
            external_identifier: userInfo.dn,
            role: userRole?.id ?? defaultRoleId,
        };
        // Run hook so the end user has the chance to augment the
        // user that is about to be created
        const updatedUserPayload = await emitter.emitFilter(`auth.create`, userPayload, { identifier: userInfo.dn, provider: this.config['provider'], providerPayload: { userInfo, userRole } }, { database: getDatabase(), schema: this.schema, accountability: null });
        try {
            await this.usersService.createOne(updatedUserPayload);
        }
        catch (e) {
            if (e instanceof RecordNotUniqueException) {
                logger.warn(e, '[LDAP] Failed to register user. User not unique');
                throw new InvalidProviderException();
            }
            throw e;
        }
        return (await this.fetchUserId(userInfo.dn));
    }
    async verify(user, password) {
        if (!user.external_identifier || !password) {
            throw new InvalidCredentialsException();
        }
        return new Promise((resolve, reject) => {
            const clientConfig = typeof this.config['client'] === 'object' ? this.config['client'] : {};
            const client = ldap.createClient({
                url: this.config['clientUrl'],
                ...clientConfig,
                reconnect: false,
            });
            client.on('error', (err) => {
                reject(handleError(err));
            });
            client.bind(user.external_identifier, password, (err) => {
                if (err) {
                    reject(handleError(err));
                }
                else {
                    resolve();
                }
                client.destroy();
            });
        });
    }
    async login(user, payload) {
        await this.verify(user, payload['password']);
    }
    async refresh(user) {
        await this.validateBindClient();
        const userInfo = await this.fetchUserInfo(user.external_identifier);
        if (userInfo?.userAccountControl && userInfo.userAccountControl & INVALID_ACCOUNT_FLAGS) {
            throw new InvalidCredentialsException();
        }
    }
}
const handleError = (e) => {
    if (e instanceof ldap.InappropriateAuthenticationError ||
        e instanceof ldap.InvalidCredentialsError ||
        e instanceof ldap.InsufficientAccessRightsError) {
        return new InvalidCredentialsException();
    }
    return new ServiceUnavailableException('Service returned unexpected error', {
        service: 'ldap',
        message: e.message,
    });
};
const getEntryValue = (value) => {
    return typeof value === 'object' ? value[0] : value;
};
export function createLDAPAuthRouter(provider) {
    const router = Router();
    const loginSchema = Joi.object({
        identifier: Joi.string().required(),
        password: Joi.string().required(),
        mode: Joi.string().valid('cookie', 'json'),
        otp: Joi.string(),
    }).unknown();
    router.post('/', asyncHandler(async (req, res, next) => {
        const accountability = {
            ip: getIPFromReq(req),
            role: null,
        };
        const userAgent = req.get('user-agent');
        if (userAgent)
            accountability.userAgent = userAgent;
        const origin = req.get('origin');
        if (origin)
            accountability.origin = origin;
        const authenticationService = new AuthenticationService({
            accountability: accountability,
            schema: req.schema,
        });
        const { error } = loginSchema.validate(req.body);
        if (error) {
            throw new InvalidPayloadException(error.message);
        }
        const mode = req.body.mode || 'json';
        const { accessToken, refreshToken, expires } = await authenticationService.login(provider, req.body, req.body?.otp);
        const payload = {
            data: { access_token: accessToken, expires },
        };
        if (mode === 'json') {
            payload['data']['refresh_token'] = refreshToken;
        }
        if (mode === 'cookie') {
            res.cookie(env['REFRESH_TOKEN_COOKIE_NAME'], refreshToken, {
                httpOnly: true,
                domain: env['REFRESH_TOKEN_COOKIE_DOMAIN'],
                maxAge: getMilliseconds(env['REFRESH_TOKEN_TTL']),
                secure: env['REFRESH_TOKEN_COOKIE_SECURE'] ?? false,
                sameSite: env['REFRESH_TOKEN_COOKIE_SAME_SITE'] || 'strict',
            });
        }
        res.locals['payload'] = payload;
        return next();
    }), respond);
    return router;
}

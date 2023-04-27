import * as samlify from 'samlify';
import { UsersService } from '../../services/users.js';
import type { AuthDriverOptions, User } from '../../types/index.js';
import { LocalAuthDriver } from './local.js';
export declare class SAMLAuthDriver extends LocalAuthDriver {
    sp: samlify.ServiceProviderInstance;
    idp: samlify.IdentityProviderInstance;
    usersService: UsersService;
    config: Record<string, any>;
    constructor(options: AuthDriverOptions, config: Record<string, any>);
    fetchUserID(identifier: string): Promise<any>;
    getUserID(payload: Record<string, any>): Promise<any>;
    login(_user: User): Promise<void>;
}
export declare function createSAMLAuthRouter(providerName: string): import("express-serve-static-core").Router;

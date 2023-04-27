import { Router } from 'express';
import type { Client } from 'openid-client';
import { UsersService } from '../../services/users.js';
import type { AuthDriverOptions, User } from '../../types/index.js';
import { LocalAuthDriver } from './local.js';
export declare class OpenIDAuthDriver extends LocalAuthDriver {
    client: Promise<Client>;
    redirectUrl: string;
    usersService: UsersService;
    config: Record<string, any>;
    constructor(options: AuthDriverOptions, config: Record<string, any>);
    generateCodeVerifier(): string;
    generateAuthUrl(codeVerifier: string, prompt?: boolean): Promise<string>;
    private fetchUserId;
    getUserID(payload: Record<string, any>): Promise<string>;
    login(user: User): Promise<void>;
    refresh(user: User): Promise<void>;
}
export declare function createOpenIDAuthRouter(providerName: string): Router;

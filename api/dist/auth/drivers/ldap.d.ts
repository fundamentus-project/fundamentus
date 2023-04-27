import { Router } from 'express';
import type { Client } from 'ldapjs';
import { UsersService } from '../../services/users.js';
import type { AuthDriverOptions, User } from '../../types/index.js';
import { AuthDriver } from '../auth.js';
export declare class LDAPAuthDriver extends AuthDriver {
    bindClient: Client;
    usersService: UsersService;
    config: Record<string, any>;
    constructor(options: AuthDriverOptions, config: Record<string, any>);
    private validateBindClient;
    private fetchUserInfo;
    private fetchUserGroups;
    private fetchUserId;
    getUserID(payload: Record<string, any>): Promise<string>;
    verify(user: User, password?: string): Promise<void>;
    login(user: User, payload: Record<string, any>): Promise<void>;
    refresh(user: User): Promise<void>;
}
export declare function createLDAPAuthRouter(provider: string): Router;

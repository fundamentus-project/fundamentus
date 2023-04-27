import type { Accountability, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { AbstractServiceOptions, LoginResult } from '../types/index.js';
import { ActivityService } from './activity.js';
export declare class AuthenticationService {
    knex: Knex;
    accountability: Accountability | null;
    activityService: ActivityService;
    schema: SchemaOverview;
    constructor(options: AbstractServiceOptions);
    /**
     * Retrieve the tokens for a given user email.
     *
     * Password is optional to allow usage of this function within the SSO flow and extensions. Make sure
     * to handle password existence checks elsewhere
     */
    login(providerName: string | undefined, payload: Record<string, any>, otp?: string): Promise<LoginResult>;
    refresh(refreshToken: string): Promise<Record<string, any>>;
    logout(refreshToken: string): Promise<void>;
    verifyPassword(userID: string, password: string): Promise<void>;
}

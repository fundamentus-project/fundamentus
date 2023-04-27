import type { Query } from '@directus/types';
import type { AbstractServiceOptions, Item, MutationOptions, PrimaryKey } from '../types/index.js';
import { ItemsService } from './items.js';
export declare class UsersService extends ItemsService {
    constructor(options: AbstractServiceOptions);
    /**
     * User email has to be unique case-insensitive. This is an additional check to make sure that
     * the email is unique regardless of casing
     */
    private checkUniqueEmails;
    /**
     * Check if the provided password matches the strictness as configured in
     * directus_settings.auth_password_policy
     */
    private checkPasswordPolicy;
    private checkRemainingAdminExistence;
    /**
     * Make sure there's at least one active admin user when updating user status
     */
    private checkRemainingActiveAdmin;
    /**
     * Get basic information of user identified by email
     */
    private getUserByEmail;
    /**
     * Create url for inviting users
     */
    private inviteUrl;
    /**
     * Create a new user
     */
    createOne(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Create multiple new users
     */
    createMany(data: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Update many users by query
     */
    updateByQuery(query: Query, data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Update a single user by primary key
     */
    updateOne(key: PrimaryKey, data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    updateBatch(data: Partial<Item>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Update many users by primary key
     */
    updateMany(keys: PrimaryKey[], data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey[]>;
    /**
     * Delete a single user by primary key
     */
    deleteOne(key: PrimaryKey, opts?: MutationOptions): Promise<PrimaryKey>;
    /**
     * Delete multiple users by primary key
     */
    deleteMany(keys: PrimaryKey[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    deleteByQuery(query: Query, opts?: MutationOptions): Promise<PrimaryKey[]>;
    inviteUser(email: string | string[], role: string, url: string | null, subject?: string | null): Promise<void>;
    acceptInvite(token: string, password: string): Promise<void>;
    requestPasswordReset(email: string, url: string | null, subject?: string | null): Promise<void>;
    resetPassword(token: string, password: string): Promise<void>;
}

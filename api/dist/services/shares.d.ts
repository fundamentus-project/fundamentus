import type { AbstractServiceOptions, Item, LoginResult, MutationOptions, PrimaryKey } from '../types/index.js';
import { AuthorizationService } from './authorization.js';
import { ItemsService } from './items.js';
export declare class SharesService extends ItemsService {
    authorizationService: AuthorizationService;
    constructor(options: AbstractServiceOptions);
    createOne(data: Partial<Item>, opts?: MutationOptions): Promise<PrimaryKey>;
    login(payload: Record<string, any>): Promise<LoginResult>;
    /**
     * Send a link to the given share ID to the given email(s). Note: you can only send a link to a share
     * if you have read access to that particular share
     */
    invite(payload: {
        emails: string[];
        share: PrimaryKey;
    }): Promise<void>;
}

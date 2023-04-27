import type { Knex } from 'knex';
import type { AbstractServiceOptions, PrimaryKey } from '../types/index.js';
import { ItemsService } from './items.js';
export declare class TFAService {
    knex: Knex;
    itemsService: ItemsService;
    constructor(options: AbstractServiceOptions);
    verifyOTP(key: PrimaryKey, otp: string, secret?: string): Promise<boolean>;
    generateTFA(key: PrimaryKey): Promise<Record<string, string>>;
    enableTFA(key: PrimaryKey, otp: string, secret: string): Promise<void>;
    disableTFA(key: PrimaryKey): Promise<void>;
}

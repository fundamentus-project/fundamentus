import type { Notification } from '@directus/types';
import type { AbstractServiceOptions, MutationOptions, PrimaryKey } from '../types/index.js';
import { ItemsService } from './items.js';
import { MailService } from './mail/index.js';
import { UsersService } from './users.js';
export declare class NotificationsService extends ItemsService {
    usersService: UsersService;
    mailService: MailService;
    constructor(options: AbstractServiceOptions);
    createOne(data: Partial<Notification>, opts?: MutationOptions): Promise<PrimaryKey>;
    createMany(data: Partial<Notification>[], opts?: MutationOptions): Promise<PrimaryKey[]>;
    sendEmail(data: Partial<Notification>): Promise<void>;
}

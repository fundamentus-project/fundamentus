import env from '../env.js';
import logger from '../logger.js';
import { md } from '../utils/md.js';
import { Url } from '../utils/url.js';
import { ItemsService } from './items.js';
import { MailService } from './mail/index.js';
import { UsersService } from './users.js';
export class NotificationsService extends ItemsService {
    usersService;
    mailService;
    constructor(options) {
        super('directus_notifications', options);
        this.usersService = new UsersService({ schema: this.schema });
        this.mailService = new MailService({ schema: this.schema, accountability: this.accountability });
    }
    async createOne(data, opts) {
        const response = await super.createOne(data, opts);
        await this.sendEmail(data);
        return response;
    }
    async createMany(data, opts) {
        const response = await super.createMany(data, opts);
        for (const notification of data) {
            await this.sendEmail(notification);
        }
        return response;
    }
    async sendEmail(data) {
        if (data.recipient) {
            const user = await this.usersService.readOne(data.recipient, {
                fields: ['id', 'email', 'email_notifications', 'role.app_access'],
            });
            const manageUserAccountUrl = new Url(env['PUBLIC_URL']).addPath('admin', 'users', user['id']).toString();
            const html = data.message ? md(data.message) : '';
            if (user['email'] && user['email_notifications'] === true) {
                try {
                    await this.mailService.send({
                        template: {
                            name: 'base',
                            data: user['role']?.app_access ? { url: manageUserAccountUrl, html } : { html },
                        },
                        to: user['email'],
                        subject: data.subject,
                    });
                }
                catch (error) {
                    logger.error(error.message);
                }
            }
        }
    }
}

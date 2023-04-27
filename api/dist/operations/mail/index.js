import { defineOperationApi } from '@directus/utils';
import { MailService } from '../../services/mail/index.js';
import { md } from '../../utils/md.js';
export default defineOperationApi({
    id: 'mail',
    handler: async ({ body, template, data, to, type, subject }, { accountability, database, getSchema }) => {
        const mailService = new MailService({ schema: await getSchema({ database }), accountability, knex: database });
        const mailObject = { to, subject };
        const safeBody = typeof body !== 'string' ? JSON.stringify(body) : body;
        if (type === 'template') {
            mailObject.template = {
                name: template || 'base',
                data: data || {},
            };
        }
        else {
            mailObject.html = type === 'wysiwyg' ? safeBody : md(safeBody);
        }
        await mailService.send(mailObject);
    },
});

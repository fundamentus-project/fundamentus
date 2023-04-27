import fse from 'fs-extra';
import { Liquid } from 'liquidjs';
import path from 'path';
import getDatabase from '../../database/index.js';
import env from '../../env.js';
import { InvalidPayloadException } from '../../exceptions/index.js';
import logger from '../../logger.js';
import getMailer from '../../mailer.js';
import { Url } from '../../utils/url.js';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const liquidEngine = new Liquid({
    root: [path.resolve(env['EXTENSIONS_PATH'], 'templates'), path.resolve(__dirname, 'templates')],
    extname: '.liquid',
});
export class MailService {
    schema;
    accountability;
    knex;
    mailer;
    constructor(opts) {
        this.schema = opts.schema;
        this.accountability = opts.accountability || null;
        this.knex = opts?.knex || getDatabase();
        this.mailer = getMailer();
        if (env['EMAIL_VERIFY_SETUP']) {
            this.mailer.verify((error) => {
                if (error) {
                    logger.warn(`Email connection failed:`);
                    logger.warn(error);
                }
            });
        }
    }
    async send(options) {
        const { template, ...emailOptions } = options;
        let { html } = options;
        const defaultTemplateData = await this.getDefaultTemplateData();
        const from = `${defaultTemplateData.projectName} <${options.from || env['EMAIL_FROM']}>`;
        if (template) {
            let templateData = template.data;
            templateData = {
                ...defaultTemplateData,
                ...templateData,
            };
            html = await this.renderTemplate(template.name, templateData);
        }
        if (typeof html === 'string') {
            // Some email clients start acting funky when line length exceeds 75 characters. See #6074
            html = html
                .split('\n')
                .map((line) => line.trim())
                .join('\n');
        }
        const info = await this.mailer.sendMail({ ...emailOptions, from, html });
        return info;
    }
    async renderTemplate(template, variables) {
        const customTemplatePath = path.resolve(env['EXTENSIONS_PATH'], 'templates', template + '.liquid');
        const systemTemplatePath = path.join(__dirname, 'templates', template + '.liquid');
        const templatePath = (await fse.pathExists(customTemplatePath)) ? customTemplatePath : systemTemplatePath;
        if ((await fse.pathExists(templatePath)) === false) {
            throw new InvalidPayloadException(`Template "${template}" doesn't exist.`);
        }
        const templateString = await fse.readFile(templatePath, 'utf8');
        const html = await liquidEngine.parseAndRender(templateString, variables);
        return html;
    }
    async getDefaultTemplateData() {
        const projectInfo = await this.knex
            .select(['project_name', 'project_logo', 'project_color', 'project_url'])
            .from('directus_settings')
            .first();
        return {
            projectName: projectInfo?.project_name || 'Directus',
            projectColor: projectInfo?.project_color || '#546e7a',
            projectLogo: getProjectLogoURL(projectInfo?.project_logo),
            projectUrl: projectInfo?.project_url || '',
        };
        function getProjectLogoURL(logoID) {
            const projectLogoUrl = new Url(env['PUBLIC_URL']);
            if (logoID) {
                projectLogoUrl.addPath('assets', logoID);
            }
            else {
                projectLogoUrl.addPath('admin', 'img', 'directus-white.png');
            }
            return projectLogoUrl.toString();
        }
    }
}

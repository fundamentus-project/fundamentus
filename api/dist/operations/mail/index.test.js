import knex from 'knex';
import { MockClient } from 'knex-mock-client';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { MailService } from '../../services/mail/index.js';
import * as mdUtil from '../../utils/md.js';
import config from './index.js';
describe('Operations / Mail', () => {
    let mockOperationContext;
    let mailServiceSendSpy;
    let mdSpy;
    beforeEach(async () => {
        mockOperationContext = {
            accountability: null,
            database: vi.mocked(knex.default({ client: MockClient })),
            getSchema: vi.fn().mockResolvedValue({}),
        };
        mailServiceSendSpy = vi.spyOn(MailService.prototype, 'send').mockResolvedValue(true);
        mdSpy = vi.spyOn(mdUtil, 'md');
    });
    test('use base template when type is template but no template was selected', async () => {
        const options = {
            to: 'test@example.com',
            subject: 'Test',
            type: 'template',
        };
        await config.handler(options, mockOperationContext);
        expect(mailServiceSendSpy).toHaveBeenCalledWith(expect.objectContaining({ to: options.to, subject: options.subject, template: { name: 'base', data: {} } }));
        expect(mailServiceSendSpy).toHaveBeenCalledWith(expect.not.objectContaining({ html: expect.any(String) }));
    });
    test('use custom template when type is template and custom template was selected', async () => {
        const options = {
            to: 'test@example.com',
            subject: 'Test',
            type: 'template',
            template: 'custom',
        };
        await config.handler(options, mockOperationContext);
        expect(mailServiceSendSpy).toHaveBeenCalledWith(expect.objectContaining({ to: options.to, subject: options.subject, template: { name: 'custom', data: {} } }));
        expect(mailServiceSendSpy).toHaveBeenCalledWith(expect.not.objectContaining({ html: expect.any(String) }));
    });
    test('pass custom data with template when type is template and data is included', async () => {
        const options = {
            to: 'test@example.com',
            subject: 'Test',
            type: 'template',
            data: { key: 'value' },
        };
        await config.handler(options, mockOperationContext);
        expect(mailServiceSendSpy).toHaveBeenCalledWith(expect.objectContaining({
            to: options.to,
            subject: options.subject,
            template: { name: 'base', data: { key: 'value' } },
        }));
        expect(mailServiceSendSpy).toHaveBeenCalledWith(expect.not.objectContaining({ html: expect.any(String) }));
    });
    test('pass custom data with template when type is template, custom template was selected and data is included', async () => {
        const options = {
            to: 'test@example.com',
            subject: 'Test',
            type: 'template',
            template: 'custom',
            data: { key: 'value' },
        };
        await config.handler(options, mockOperationContext);
        expect(mailServiceSendSpy).toHaveBeenCalledWith(expect.objectContaining({
            to: options.to,
            subject: options.subject,
            template: { name: 'custom', data: { key: 'value' } },
        }));
        expect(mailServiceSendSpy).toHaveBeenCalledWith(expect.not.objectContaining({ html: expect.any(String) }));
    });
    test('use body as is when type is wysiwyg', async () => {
        const options = {
            to: 'test@example.com',
            subject: 'Test',
            type: 'wysiwyg',
            body: 'test body',
        };
        await config.handler(options, mockOperationContext);
        expect(mailServiceSendSpy).toHaveBeenCalledWith(expect.objectContaining({
            to: options.to,
            subject: options.subject,
            html: options.body,
        }));
        expect(mdSpy).not.toHaveBeenCalled();
    });
    test('use md() on body when type is markdown', async () => {
        const options = {
            to: 'test@example.com',
            subject: 'Test',
            type: 'markdown',
            body: 'test body',
        };
        await config.handler(options, mockOperationContext);
        expect(mailServiceSendSpy).toHaveBeenCalledWith(expect.objectContaining({
            to: options.to,
            subject: options.subject,
            html: '<p>test body</p>\n',
        }));
        expect(mdSpy).toHaveBeenCalled();
    });
});

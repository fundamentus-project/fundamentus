import type { Accountability, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { AbstractServiceOptions } from '../types/index.js';
import { SettingsService } from './settings.js';
export declare class ServerService {
    knex: Knex;
    accountability: Accountability | null;
    settingsService: SettingsService;
    schema: SchemaOverview;
    constructor(options: AbstractServiceOptions);
    serverInfo(): Promise<Record<string, any>>;
    health(): Promise<Record<string, any>>;
}

/// <reference types="node" resolution-mode="require"/>
import type { Range, Stat } from '@directus/storage';
import type { Accountability } from '@directus/types';
import type { Knex } from 'knex';
import type { Readable } from 'node:stream';
import type { AbstractServiceOptions, TransformationParams } from '../types/index.js';
import { AuthorizationService } from './authorization.js';
export declare class AssetsService {
    knex: Knex;
    accountability: Accountability | null;
    authorizationService: AuthorizationService;
    constructor(options: AbstractServiceOptions);
    getAsset(id: string, transformation: TransformationParams, range?: Range): Promise<{
        stream: Readable;
        file: any;
        stat: Stat;
    }>;
}

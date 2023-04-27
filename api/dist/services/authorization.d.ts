import type { Accountability, PermissionsAction, SchemaOverview } from '@directus/types';
import type { Knex } from 'knex';
import type { AbstractServiceOptions, AST, Item, PrimaryKey } from '../types/index.js';
import { PayloadService } from './payload.js';
export declare class AuthorizationService {
    knex: Knex;
    accountability: Accountability | null;
    payloadService: PayloadService;
    schema: SchemaOverview;
    constructor(options: AbstractServiceOptions);
    processAST(ast: AST, action?: PermissionsAction): Promise<AST>;
    /**
     * Checks if the provided payload matches the configured permissions, and adds the presets to the payload.
     */
    validatePayload(action: PermissionsAction, collection: string, data: Partial<Item>): Partial<Item>;
    checkAccess(action: PermissionsAction, collection: string, pk: PrimaryKey | PrimaryKey[]): Promise<void>;
}

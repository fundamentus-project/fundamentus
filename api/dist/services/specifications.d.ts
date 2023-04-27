import type { Knex } from 'knex';
import type { OpenAPIObject } from 'openapi3-ts';
import type { Accountability, SchemaOverview } from '@directus/types';
import type { AbstractServiceOptions } from '../types/index.js';
import { CollectionsService } from './collections.js';
import { FieldsService } from './fields.js';
import { GraphQLService } from './graphql/index.js';
import { RelationsService } from './relations.js';
export declare class SpecificationService {
    accountability: Accountability | null;
    knex: Knex;
    schema: SchemaOverview;
    fieldsService: FieldsService;
    collectionsService: CollectionsService;
    relationsService: RelationsService;
    oas: OASSpecsService;
    graphql: GraphQLSpecsService;
    constructor(options: AbstractServiceOptions);
}
interface SpecificationSubService {
    generate: (_?: any) => Promise<any>;
}
declare class OASSpecsService implements SpecificationSubService {
    accountability: Accountability | null;
    knex: Knex;
    schema: SchemaOverview;
    fieldsService: FieldsService;
    collectionsService: CollectionsService;
    relationsService: RelationsService;
    constructor(options: AbstractServiceOptions, { fieldsService, collectionsService, relationsService, }: {
        fieldsService: FieldsService;
        collectionsService: CollectionsService;
        relationsService: RelationsService;
    });
    generate(): Promise<OpenAPIObject>;
    private generateTags;
    private generatePaths;
    private generateComponents;
    private filterCollectionFromParams;
    private getActionForMethod;
    private generateField;
    private fieldTypes;
}
declare class GraphQLSpecsService implements SpecificationSubService {
    accountability: Accountability | null;
    knex: Knex;
    schema: SchemaOverview;
    items: GraphQLService;
    system: GraphQLService;
    constructor(options: AbstractServiceOptions);
    generate(scope: 'items' | 'system'): Promise<string | import("graphql").GraphQLSchema | null>;
}
export {};

import { spec } from '@directus/specs';
import { cloneDeep, mergeWith } from 'lodash-es';
import { version } from '../utils/package.js';
import { OAS_REQUIRED_SCHEMAS } from '../constants.js';
import getDatabase from '../database/index.js';
import env from '../env.js';
import { getRelationType } from '../utils/get-relation-type.js';
import { CollectionsService } from './collections.js';
import { FieldsService } from './fields.js';
import { GraphQLService } from './graphql/index.js';
import { RelationsService } from './relations.js';
import formatTitle from '@directus/format-title';
export class SpecificationService {
    accountability;
    knex;
    schema;
    fieldsService;
    collectionsService;
    relationsService;
    oas;
    graphql;
    constructor(options) {
        this.accountability = options.accountability || null;
        this.knex = options.knex || getDatabase();
        this.schema = options.schema;
        this.fieldsService = new FieldsService(options);
        this.collectionsService = new CollectionsService(options);
        this.relationsService = new RelationsService(options);
        this.oas = new OASSpecsService(options, {
            fieldsService: this.fieldsService,
            collectionsService: this.collectionsService,
            relationsService: this.relationsService,
        });
        this.graphql = new GraphQLSpecsService(options);
    }
}
class OASSpecsService {
    accountability;
    knex;
    schema;
    fieldsService;
    collectionsService;
    relationsService;
    constructor(options, { fieldsService, collectionsService, relationsService, }) {
        this.accountability = options.accountability || null;
        this.knex = options.knex || getDatabase();
        this.schema = options.schema;
        this.fieldsService = fieldsService;
        this.collectionsService = collectionsService;
        this.relationsService = relationsService;
    }
    async generate() {
        const collections = await this.collectionsService.readByQuery();
        const fields = await this.fieldsService.readAll();
        const relations = (await this.relationsService.readAll());
        const permissions = this.accountability?.permissions ?? [];
        const tags = await this.generateTags(collections);
        const paths = await this.generatePaths(permissions, tags);
        const components = await this.generateComponents(collections, fields, relations, tags);
        const spec = {
            openapi: '3.0.1',
            info: {
                title: 'Dynamic API Specification',
                description: 'This is a dynamically generated API specification for all endpoints existing on the current project.',
                version: version,
            },
            servers: [
                {
                    url: env['PUBLIC_URL'],
                    description: 'Your current Directus instance.',
                },
            ],
            paths,
        };
        if (tags)
            spec.tags = tags;
        if (components)
            spec.components = components;
        return spec;
    }
    async generateTags(collections) {
        const systemTags = cloneDeep(spec.tags);
        const tags = [];
        // System tags that don't have an associated collection are always readable to the user
        for (const systemTag of systemTags) {
            if (!systemTag['x-collection']) {
                tags.push(systemTag);
            }
        }
        for (const collection of collections) {
            const isSystem = collection.collection.startsWith('directus_');
            // If the collection is one of the system collections, pull the tag from the static spec
            if (isSystem) {
                for (const tag of spec.tags) {
                    if (tag['x-collection'] === collection.collection) {
                        tags.push(tag);
                        break;
                    }
                }
            }
            else {
                const tag = {
                    name: 'Items' + formatTitle(collection.collection).replace(/ /g, ''),
                    'x-collection': collection.collection,
                };
                if (collection.meta?.note) {
                    tag.description = collection.meta.note;
                }
                tags.push(tag);
            }
        }
        // Filter out the generic Items information
        return tags.filter((tag) => tag.name !== 'Items');
    }
    async generatePaths(permissions, tags) {
        const paths = {};
        if (!tags)
            return paths;
        for (const tag of tags) {
            const isSystem = 'x-collection' in tag === false || tag['x-collection'].startsWith('directus_');
            if (isSystem) {
                for (const [path, pathItem] of Object.entries(spec.paths)) {
                    for (const [method, operation] of Object.entries(pathItem)) {
                        if (operation.tags?.includes(tag.name)) {
                            if (!paths[path]) {
                                paths[path] = {};
                            }
                            const hasPermission = this.accountability?.admin === true ||
                                'x-collection' in tag === false ||
                                !!permissions.find((permission) => permission.collection === tag['x-collection'] &&
                                    permission.action === this.getActionForMethod(method));
                            if (hasPermission) {
                                if ('parameters' in pathItem) {
                                    paths[path][method] = {
                                        ...operation,
                                        parameters: [...(pathItem.parameters ?? []), ...(operation?.parameters ?? [])],
                                    };
                                }
                                else {
                                    paths[path][method] = operation;
                                }
                            }
                        }
                    }
                }
            }
            else {
                const listBase = cloneDeep(spec.paths['/items/{collection}']);
                const detailBase = cloneDeep(spec.paths['/items/{collection}/{id}']);
                const collection = tag['x-collection'];
                for (const method of ['post', 'get', 'patch', 'delete']) {
                    const hasPermission = this.accountability?.admin === true ||
                        !!permissions.find((permission) => permission.collection === collection && permission.action === this.getActionForMethod(method));
                    if (hasPermission) {
                        if (!paths[`/items/${collection}`])
                            paths[`/items/${collection}`] = {};
                        if (!paths[`/items/${collection}/{id}`])
                            paths[`/items/${collection}/{id}`] = {};
                        if (listBase[method]) {
                            paths[`/items/${collection}`][method] = mergeWith(cloneDeep(listBase[method]), {
                                description: listBase[method].description.replace('item', collection + ' item'),
                                tags: [tag.name],
                                parameters: 'parameters' in listBase ? this.filterCollectionFromParams(listBase.parameters) : [],
                                operationId: `${this.getActionForMethod(method)}${tag.name}`,
                                requestBody: ['get', 'delete'].includes(method)
                                    ? undefined
                                    : {
                                        content: {
                                            'application/json': {
                                                schema: {
                                                    oneOf: [
                                                        {
                                                            type: 'array',
                                                            items: {
                                                                $ref: `#/components/schemas/${tag.name}`,
                                                            },
                                                        },
                                                        {
                                                            $ref: `#/components/schemas/${tag.name}`,
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                responses: {
                                    '200': {
                                        content: method === 'delete'
                                            ? undefined
                                            : {
                                                'application/json': {
                                                    schema: {
                                                        properties: {
                                                            data: {
                                                                items: {
                                                                    $ref: `#/components/schemas/${tag.name}`,
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                    },
                                },
                            }, (obj, src) => {
                                if (Array.isArray(obj))
                                    return obj.concat(src);
                                return undefined;
                            });
                        }
                        if (detailBase[method]) {
                            paths[`/items/${collection}/{id}`][method] = mergeWith(cloneDeep(detailBase[method]), {
                                description: detailBase[method].description.replace('item', collection + ' item'),
                                tags: [tag.name],
                                operationId: `${this.getActionForMethod(method)}Single${tag.name}`,
                                parameters: 'parameters' in detailBase ? this.filterCollectionFromParams(detailBase.parameters) : [],
                                requestBody: ['get', 'delete'].includes(method)
                                    ? undefined
                                    : {
                                        content: {
                                            'application/json': {
                                                schema: {
                                                    $ref: `#/components/schemas/${tag.name}`,
                                                },
                                            },
                                        },
                                    },
                                responses: {
                                    '200': {
                                        content: method === 'delete'
                                            ? undefined
                                            : {
                                                'application/json': {
                                                    schema: {
                                                        properties: {
                                                            data: {
                                                                $ref: `#/components/schemas/${tag.name}`,
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                    },
                                },
                            }, (obj, src) => {
                                if (Array.isArray(obj))
                                    return obj.concat(src);
                                return undefined;
                            });
                        }
                    }
                }
            }
        }
        return paths;
    }
    async generateComponents(collections, fields, relations, tags) {
        let components = cloneDeep(spec.components);
        if (!components)
            components = {};
        components.schemas = {};
        // Always includes the schemas with these names
        if (spec.components?.schemas !== null) {
            for (const schemaName of OAS_REQUIRED_SCHEMAS) {
                if (spec.components.schemas[schemaName] !== null) {
                    components.schemas[schemaName] = cloneDeep(spec.components.schemas[schemaName]);
                }
            }
        }
        if (!tags)
            return;
        for (const collection of collections) {
            const tag = tags.find((tag) => tag['x-collection'] === collection.collection);
            if (!tag)
                continue;
            const isSystem = collection.collection.startsWith('directus_');
            const fieldsInCollection = fields.filter((field) => field.collection === collection.collection);
            if (isSystem) {
                const schemaComponent = cloneDeep(spec.components.schemas[tag.name]);
                schemaComponent.properties = {};
                for (const field of fieldsInCollection) {
                    schemaComponent.properties[field.field] =
                        cloneDeep(spec.components.schemas[tag.name].properties[field.field]) || this.generateField(field, relations, tags, fields);
                }
                components.schemas[tag.name] = schemaComponent;
            }
            else {
                const schemaComponent = {
                    type: 'object',
                    properties: {},
                    'x-collection': collection.collection,
                };
                for (const field of fieldsInCollection) {
                    schemaComponent.properties[field.field] = this.generateField(field, relations, tags, fields);
                }
                components.schemas[tag.name] = schemaComponent;
            }
        }
        return components;
    }
    filterCollectionFromParams(parameters) {
        return parameters.filter((param) => param?.$ref !== '#/components/parameters/Collection');
    }
    getActionForMethod(method) {
        switch (method) {
            case 'post':
                return 'create';
            case 'patch':
                return 'update';
            case 'delete':
                return 'delete';
            case 'get':
            default:
                return 'read';
        }
    }
    generateField(field, relations, tags, fields) {
        let propertyObject = {};
        if (field.schema && 'is_nullable' in field.schema) {
            propertyObject.nullable = field.schema.is_nullable;
        }
        if (field.meta?.note) {
            propertyObject.description = field.meta.note;
        }
        const relation = relations.find((relation) => (relation.collection === field.collection && relation.field === field.field) ||
            (relation.related_collection === field.collection && relation.meta?.one_field === field.field));
        if (!relation) {
            propertyObject = {
                ...propertyObject,
                ...this.fieldTypes[field.type],
            };
        }
        else {
            const relationType = getRelationType({
                relation,
                field: field.field,
                collection: field.collection,
            });
            if (relationType === 'm2o') {
                const relatedTag = tags.find((tag) => tag['x-collection'] === relation.related_collection);
                const relatedPrimaryKeyField = fields.find((field) => field.collection === relation.related_collection && field.schema?.is_primary_key);
                if (!relatedTag || !relatedPrimaryKeyField)
                    return propertyObject;
                propertyObject.oneOf = [
                    {
                        ...this.fieldTypes[relatedPrimaryKeyField.type],
                    },
                    {
                        $ref: `#/components/schemas/${relatedTag.name}`,
                    },
                ];
            }
            else if (relationType === 'o2m') {
                const relatedTag = tags.find((tag) => tag['x-collection'] === relation.collection);
                const relatedPrimaryKeyField = fields.find((field) => field.collection === relation.collection && field.schema?.is_primary_key);
                if (!relatedTag || !relatedPrimaryKeyField)
                    return propertyObject;
                propertyObject.type = 'array';
                propertyObject.items = {
                    oneOf: [
                        {
                            ...this.fieldTypes[relatedPrimaryKeyField.type],
                        },
                        {
                            $ref: `#/components/schemas/${relatedTag.name}`,
                        },
                    ],
                };
            }
            else if (relationType === 'a2o') {
                const relatedTags = tags.filter((tag) => relation.meta.one_allowed_collections.includes(tag['x-collection']));
                propertyObject.type = 'array';
                propertyObject.items = {
                    oneOf: [
                        {
                            type: 'string',
                        },
                        relatedTags.map((tag) => ({
                            $ref: `#/components/schemas/${tag.name}`,
                        })),
                    ],
                };
            }
        }
        return propertyObject;
    }
    fieldTypes = {
        alias: {
            type: 'string',
        },
        bigInteger: {
            type: 'integer',
            format: 'int64',
        },
        binary: {
            type: 'string',
            format: 'binary',
        },
        boolean: {
            type: 'boolean',
        },
        csv: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        date: {
            type: 'string',
            format: 'date',
        },
        dateTime: {
            type: 'string',
            format: 'date-time',
        },
        decimal: {
            type: 'number',
        },
        float: {
            type: 'number',
            format: 'float',
        },
        hash: {
            type: 'string',
        },
        integer: {
            type: 'integer',
        },
        json: {},
        string: {
            type: 'string',
        },
        text: {
            type: 'string',
        },
        time: {
            type: 'string',
            format: 'time',
        },
        timestamp: {
            type: 'string',
            format: 'timestamp',
        },
        unknown: {},
        uuid: {
            type: 'string',
            format: 'uuid',
        },
        geometry: {
            type: 'object',
        },
        'geometry.Point': {
            type: 'object',
        },
        'geometry.LineString': {
            type: 'object',
        },
        'geometry.Polygon': {
            type: 'object',
        },
        'geometry.MultiPoint': {
            type: 'object',
        },
        'geometry.MultiLineString': {
            type: 'object',
        },
        'geometry.MultiPolygon': {
            type: 'object',
        },
    };
}
class GraphQLSpecsService {
    accountability;
    knex;
    schema;
    items;
    system;
    constructor(options) {
        this.accountability = options.accountability || null;
        this.knex = options.knex || getDatabase();
        this.schema = options.schema;
        this.items = new GraphQLService({ ...options, scope: 'items' });
        this.system = new GraphQLService({ ...options, scope: 'system' });
    }
    async generate(scope) {
        if (scope === 'items')
            return this.items.getSchema('sdl');
        if (scope === 'system')
            return this.system.getSchema('sdl');
        return null;
    }
}

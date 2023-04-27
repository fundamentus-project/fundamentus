import type { Accountability, Filter, Permission, SchemaOverview } from '@directus/types';
export declare function mergePermissionsForShare(currentPermissions: Permission[], accountability: Accountability, schema: SchemaOverview): Permission[];
export declare function traverse(schema: SchemaOverview, rootItemPrimaryKeyField: string, rootItemPrimaryKey: string, currentCollection: string, parentCollections?: string[], path?: string[]): Partial<Permission>[];
export declare function getFilterForPath(type: 'o2m' | 'm2o' | 'a2o', path: string[], rootPrimaryKeyField: string, rootPrimaryKey: string): Filter;

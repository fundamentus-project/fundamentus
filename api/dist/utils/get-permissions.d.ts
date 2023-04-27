import type { Accountability, Permission, SchemaOverview } from '@directus/types';
export declare function getPermissions(accountability: Accountability, schema: SchemaOverview): Promise<Permission[]>;

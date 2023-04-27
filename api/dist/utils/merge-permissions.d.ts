import type { Permission } from '@directus/types';
export declare function mergePermissions(strategy: 'and' | 'or', ...permissions: Permission[][]): Permission[];
export declare function mergePermission(strategy: 'and' | 'or', currentPerm: Permission, newPerm: Permission): Omit<Permission, 'id' | 'system'>;

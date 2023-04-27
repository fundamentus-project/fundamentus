import type { Accountability, Filter, Role, User } from '@directus/types';
type ParseFilterContext = {
    $CURRENT_USER?: User & Record<string, any>;
    $CURRENT_ROLE?: Role & Record<string, any>;
};
export declare function parseFilter(filter: Filter | null, accountability: Accountability | null, context?: ParseFilterContext): Filter | null;
export declare function parsePreset(preset: Record<string, any> | null, accountability: Accountability | null, context: ParseFilterContext): any;
export {};

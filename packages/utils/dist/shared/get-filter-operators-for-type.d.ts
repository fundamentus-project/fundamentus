import type { ClientFilterOperator, Type } from '@directus/types';
type GetFilterOperationsForTypeOptions = {
    includeValidation?: boolean;
};
export declare function getFilterOperatorsForType(type: Type, opts?: GetFilterOperationsForTypeOptions): ClientFilterOperator[];
export {};

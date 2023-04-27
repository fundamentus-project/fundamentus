import type { Field } from '@directus/types';
import type { ComputedRef, Ref } from 'vue';
export declare function useFilterFields<T extends string>(fields: Ref<Field[]>, filters: Record<T, (field: Field) => boolean>): {
    fieldGroups: ComputedRef<Record<Extract<T, string>, Field[]>>;
};

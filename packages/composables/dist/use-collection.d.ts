import type { AppCollection, Field } from '@directus/types';
import type { ComputedRef, Ref } from 'vue';
export type UsableCollection = {
    info: ComputedRef<AppCollection | null>;
    fields: ComputedRef<Field[]>;
    defaults: ComputedRef<Record<string, any>>;
    primaryKeyField: ComputedRef<Field | null>;
    userCreatedField: ComputedRef<Field | null>;
    sortField: ComputedRef<string | null>;
    isSingleton: ComputedRef<boolean>;
    accountabilityScope: ComputedRef<'all' | 'activity' | null>;
};
export declare function useCollection(collectionKey: string | Ref<string | null>): UsableCollection;

import type { Item, Query } from '@directus/types';
import type { ComputedRef, Ref, WritableComputedRef } from 'vue';
export type ManualSortData = {
    item: string | number;
    to: string | number;
};
export type UsableItems = {
    itemCount: Ref<number | null>;
    totalCount: Ref<number | null>;
    items: Ref<Item[]>;
    totalPages: ComputedRef<number>;
    loading: Ref<boolean>;
    error: Ref<any>;
    changeManualSort: (data: ManualSortData) => Promise<void>;
    getItems: () => Promise<void>;
    getTotalCount: () => Promise<void>;
    getItemCount: () => Promise<void>;
};
export type ComputedQuery = {
    fields: Ref<Query['fields']> | ComputedRef<Query['fields']> | WritableComputedRef<Query['fields']>;
    alias?: Ref<Query['alias']> | ComputedRef<Query['alias']> | WritableComputedRef<Query['alias']>;
    limit: Ref<Query['limit']> | ComputedRef<Query['limit']> | WritableComputedRef<Query['limit']>;
    sort: Ref<Query['sort']> | ComputedRef<Query['sort']> | WritableComputedRef<Query['sort']>;
    search: Ref<Query['search']> | ComputedRef<Query['search']> | WritableComputedRef<Query['search']>;
    filter: Ref<Query['filter']> | ComputedRef<Query['filter']> | WritableComputedRef<Query['filter']>;
    page: Ref<Query['page']> | WritableComputedRef<Query['page']>;
};
export declare function useItems(collection: Ref<string | null>, query: ComputedQuery): UsableItems;

import type { Relation } from '@directus/types';
export declare function getRelationType(getRelationOptions: {
    relation?: Relation | null;
    collection: string | null;
    field: string;
}): 'm2o' | 'o2m' | 'a2o' | null;

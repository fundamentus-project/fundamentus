import type { Relation } from '@directus/types';
export declare function getRelationType(getRelationOptions: {
    relation: Relation;
    collection: string | null;
    field: string;
}): 'm2o' | 'o2m' | 'm2a' | null;

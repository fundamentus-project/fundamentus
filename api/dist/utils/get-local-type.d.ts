import type { FieldMeta, Type } from '@directus/types';
export default function getLocalType(column?: {
    data_type: string;
    numeric_precision?: null | number;
    numeric_scale?: null | number;
    max_length?: null | number;
}, field?: {
    special?: FieldMeta['special'];
}): Type | 'unknown';

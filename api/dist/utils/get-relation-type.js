export function getRelationType(getRelationOptions) {
    const { relation, collection, field } = getRelationOptions;
    if (!relation)
        return null;
    if (relation.collection === collection &&
        relation.field === field &&
        relation.meta?.one_collection_field &&
        relation.meta?.one_allowed_collections) {
        return 'a2o';
    }
    if (relation.collection === collection && relation.field === field) {
        return 'm2o';
    }
    if (relation.related_collection === collection && relation.meta?.one_field === field) {
        return 'o2m';
    }
    return null;
}

import { computed } from 'vue';
export function useFilterFields(fields, filters) {
    const fieldGroups = computed(() => {
        const acc = {};
        for (const name in filters) {
            acc[name] = [];
        }
        return fields.value.reduce((acc, field) => {
            for (const name in filters) {
                if (filters[name](field) === false)
                    continue;
                acc[name].push(field);
            }
            return acc;
        }, acc);
    });
    return { fieldGroups };
}

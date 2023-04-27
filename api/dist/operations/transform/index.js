import { defineOperationApi, optionToObject } from '@directus/utils';
export default defineOperationApi({
    id: 'transform',
    handler: ({ json }) => {
        return optionToObject(json);
    },
});

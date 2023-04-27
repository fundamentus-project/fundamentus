import { API_INJECT, EXTENSIONS_INJECT, STORES_INJECT } from '@directus/constants';
import { inject } from 'vue';
export function useStores() {
    const stores = inject(STORES_INJECT);
    if (!stores)
        throw new Error('[useStores]: The stores could not be found.');
    return stores;
}
export function useApi() {
    const api = inject(API_INJECT);
    if (!api)
        throw new Error('[useApi]: The api could not be found.');
    return api;
}
export function useExtensions() {
    const extensions = inject(EXTENSIONS_INJECT);
    if (!extensions)
        throw new Error('[useExtensions]: The extensions could not be found.');
    return extensions;
}

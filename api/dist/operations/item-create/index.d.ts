type Options = {
    collection: string;
    payload?: Record<string, any> | string | null;
    emitEvents: boolean;
    permissions: string;
};
declare const _default: import("@directus/types").OperationApiConfig<Options>;
export default _default;

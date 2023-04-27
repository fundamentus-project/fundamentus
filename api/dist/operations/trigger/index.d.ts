type Options = {
    flow: string;
    payload?: Record<string, any> | Record<string, any>[] | string | null;
    iterationMode?: 'serial' | 'batch' | 'parallel';
    batchSize?: number;
};
declare const _default: import("@directus/types").OperationApiConfig<Options>;
export default _default;

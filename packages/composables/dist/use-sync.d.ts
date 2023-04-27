import type { Ref } from 'vue';
export declare function useSync<T, K extends keyof T & string, E extends (event: `update:${K}`, ...args: any[]) => void>(props: T, key: K, emit: E): Ref<T[K]>;

import type { Ref } from 'vue';
declare global {
    interface Window {
        ResizeObserver: any;
    }
}
export declare function useElementSize<T extends Element>(target: T | Ref<T> | Ref<undefined>): {
    width: Ref<number>;
    height: Ref<number>;
};

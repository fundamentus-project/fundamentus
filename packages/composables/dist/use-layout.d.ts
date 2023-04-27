import type { Component, ComputedRef, Ref } from 'vue';
export declare function useLayout<Options = any, Query = any>(layoutId: Ref<string | null>): {
    layoutWrapper: ComputedRef<Component>;
};

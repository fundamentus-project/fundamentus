import type { ComputedRef, Ref } from 'vue';
export type UsableCustomSelection = {
    otherValue: Ref<string | null>;
    usesOtherValue: ComputedRef<boolean>;
};
export declare function useCustomSelection(currentValue: Ref<string>, items: Ref<any[]>, emit: (event: string | null) => void): UsableCustomSelection;
type OtherValue = {
    key: string;
    value: string;
};
type UsableCustomSelectionMultiple = {
    otherValues: Ref<OtherValue[]>;
    addOtherValue: (value?: string) => void;
    setOtherValue: (key: string, newValue: string | null) => void;
};
export declare function useCustomSelectionMultiple(currentValues: Ref<string[]>, items: Ref<any[]>, emit: (event: string[] | null) => void): UsableCustomSelectionMultiple;
export {};

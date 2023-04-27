import type { Ref } from 'vue';
export type GroupableInstance = {
    active: Ref<boolean>;
    value: string | number | undefined;
};
/**
 * Used to make child item part of the group context. Needs to be used in a component that is a child
 * of a component that has the `useGroupableParent` composition enabled
 */
export type GroupableOptions = {
    value?: string | number;
    group?: string;
    active?: Ref<boolean>;
    watch?: boolean;
};
export type UsableGroupable = {
    active: Ref<boolean>;
    toggle: () => void;
    activate: () => void;
    deactivate: () => void;
};
export declare function useGroupable(options?: GroupableOptions): UsableGroupable;
type GroupableParentState = {
    selection?: Ref<(string | number)[] | undefined> | Ref<readonly (string | number)[] | undefined>;
    onSelectionChange?: (newSelectionValues: readonly (string | number)[]) => void;
    onToggle?: (item: GroupableInstance) => void;
};
type GroupableParentOptions = {
    mandatory?: Ref<boolean>;
    max?: Ref<number>;
    multiple?: Ref<boolean>;
};
type UsableGroupableParent = {
    items: Ref<GroupableInstance[]>;
    selection: Ref<readonly (string | number)[]>;
    internalSelection: Ref<(string | number)[]>;
    getValueForItem: (item: GroupableInstance) => string | number;
    updateChildren: () => void;
};
/**
 * Used to make a component a group parent component. Provides the registration / toggle functions
 * to its group children
 */
export declare function useGroupableParent(state?: GroupableParentState, options?: GroupableParentOptions, group?: string): UsableGroupableParent;
export {};

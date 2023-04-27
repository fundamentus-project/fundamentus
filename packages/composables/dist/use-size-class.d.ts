import type { ComputedRef } from 'vue';
export declare const sizeProps: {
    xSmall: {
        type: BooleanConstructor;
        default: boolean;
    };
    small: {
        type: BooleanConstructor;
        default: boolean;
    };
    large: {
        type: BooleanConstructor;
        default: boolean;
    };
    xLarge: {
        type: BooleanConstructor;
        default: boolean;
    };
};
interface SizeProps {
    xSmall?: boolean;
    small?: boolean;
    large?: boolean;
    xLarge?: boolean;
}
export declare function useSizeClass<T>(props: T & SizeProps): ComputedRef<string | null>;
export {};

import { computed } from 'vue';
export const sizeProps = {
    xSmall: {
        type: Boolean,
        default: false,
    },
    small: {
        type: Boolean,
        default: false,
    },
    large: {
        type: Boolean,
        default: false,
    },
    xLarge: {
        type: Boolean,
        default: false,
    },
};
export function useSizeClass(props) {
    const sizeClass = computed(() => {
        if (props.xSmall)
            return 'x-small';
        if (props.small)
            return 'small';
        if (props.large)
            return 'large';
        if (props.xLarge)
            return 'x-large';
        return null;
    });
    return sizeClass;
}

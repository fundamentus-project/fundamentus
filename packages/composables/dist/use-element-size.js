import { isNil } from 'lodash-es';
import { isRef, onMounted, onUnmounted, ref } from 'vue';
export function useElementSize(target) {
    const width = ref(0);
    const height = ref(0);
    const resizeObserver = new ResizeObserver(([entry]) => {
        if (entry === undefined)
            return;
        width.value = entry.contentRect.width;
        height.value = entry.contentRect.height;
    });
    onMounted(() => {
        const t = isRef(target) ? target.value : target;
        if (!isNil(t)) {
            resizeObserver.observe(t);
        }
    });
    onUnmounted(() => {
        resizeObserver.disconnect();
    });
    return { width, height };
}

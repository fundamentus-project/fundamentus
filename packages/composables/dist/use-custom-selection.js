import { nanoid } from 'nanoid';
import { computed, ref, watch } from 'vue';
export function useCustomSelection(currentValue, items, emit) {
    const localOtherValue = ref('');
    const otherValue = computed({
        get() {
            return localOtherValue.value || (usesOtherValue.value ? currentValue.value : '');
        },
        set(newValue) {
            if (newValue === null) {
                localOtherValue.value = '';
                emit(null);
            }
            else {
                localOtherValue.value = newValue;
                emit(newValue);
            }
        },
    });
    const usesOtherValue = computed(() => {
        if (items.value === null)
            return false;
        // Check if set value is one of the existing keys
        const values = items.value.map((item) => item.value);
        return (currentValue.value !== null && currentValue.value.length > 0 && values.includes(currentValue.value) === false);
    });
    return { otherValue, usesOtherValue };
}
export function useCustomSelectionMultiple(currentValues, items, emit) {
    const otherValues = ref([]);
    watch(currentValues, (newValue) => {
        if (newValue === null)
            return;
        if (Array.isArray(newValue) === false)
            return;
        if (items.value === null)
            return;
        newValue.forEach((value) => {
            if (items.value === null)
                return;
            const values = items.value.map((item) => item.value);
            const existsInValues = values.includes(value) === true;
            if (existsInValues === false) {
                const other = otherValues.value.map((o) => o.value);
                const existsInOtherValues = other.includes(value) === true;
                if (existsInOtherValues === false) {
                    addOtherValue(value);
                }
            }
        });
    }, { immediate: true });
    return { otherValues, addOtherValue, setOtherValue };
    function addOtherValue(value = '') {
        otherValues.value = [
            ...otherValues.value,
            {
                key: nanoid(),
                value: value,
            },
        ];
    }
    function setOtherValue(key, newValue) {
        const previousValue = otherValues.value.find((o) => o.key === key);
        const valueWithoutPrevious = (currentValues.value || []).filter((val) => val !== previousValue?.value);
        if (newValue === null) {
            otherValues.value = otherValues.value.filter((o) => o.key !== key);
            if (valueWithoutPrevious.length === 0) {
                emit(null);
            }
            else {
                emit(valueWithoutPrevious);
            }
        }
        else {
            otherValues.value = otherValues.value.map((otherValue) => {
                if (otherValue.key === key)
                    otherValue.value = newValue;
                return otherValue;
            });
            const newEmitValue = [...valueWithoutPrevious, newValue];
            emit(newEmitValue);
        }
    }
}

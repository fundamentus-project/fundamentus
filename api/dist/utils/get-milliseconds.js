import ms from 'ms';
export function getMilliseconds(value, fallback = undefined) {
    if ((typeof value !== 'string' && typeof value !== 'number') || value === '') {
        return fallback;
    }
    return ms(String(value)) ?? fallback;
}

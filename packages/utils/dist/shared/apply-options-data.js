import { get, renderFn } from 'micromustache';
import { parseJSON } from './parse-json.js';
export function applyOptionsData(options, data, skipUndefinedKeys = []) {
    return Object.fromEntries(Object.entries(options).map(([key, value]) => [key, renderMustache(value, data, skipUndefinedKeys.includes(key))]));
}
function resolveFn(skipUndefined) {
    return (path, scope) => {
        const value = get(scope, path);
        if (value !== undefined || !skipUndefined) {
            return typeof value === 'object' ? JSON.stringify(value) : value;
        }
        else {
            return `{{ ${path} }}`;
        }
    };
}
function renderMustache(item, scope, skipUndefined) {
    if (typeof item === 'string') {
        const raw = item.match(/^\{\{\s*([^}\s]+)\s*\}\}$/);
        if (raw !== null) {
            const value = get(scope, raw[1]);
            if (value !== undefined) {
                return value;
            }
        }
        return renderFn(item, resolveFn(skipUndefined), scope, { explicit: true });
    }
    else if (Array.isArray(item)) {
        return item.map((element) => renderMustache(element, scope, skipUndefined));
    }
    else if (typeof item === 'object' && item !== null) {
        return Object.fromEntries(Object.entries(item).map(([key, value]) => [key, renderMustache(value, scope, skipUndefined)]));
    }
    else {
        return item;
    }
}
export function optionToObject(option) {
    return typeof option === 'string' ? parseJSON(option) : option;
}
export function optionToString(option) {
    return typeof option === 'object' ? JSON.stringify(option) : String(option);
}

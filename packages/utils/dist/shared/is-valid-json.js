import { parseJSON } from './parse-json.js';
export function isValidJSON(input) {
    try {
        parseJSON(input);
        return true;
    }
    catch {
        return false;
    }
}

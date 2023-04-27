import hash from 'object-hash';
import { version } from './package.js';
export function getVersionedHash(item) {
    return hash({ item, version });
}

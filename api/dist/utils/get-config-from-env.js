import camelcase from 'camelcase';
import { set } from 'lodash-es';
import { getEnv } from '../env.js';
export function getConfigFromEnv(prefix, omitPrefix, type = 'camelcase') {
    const env = getEnv();
    const config = {};
    for (const [key, value] of Object.entries(env)) {
        if (key.toLowerCase().startsWith(prefix.toLowerCase()) === false)
            continue;
        if (omitPrefix) {
            let matches = false;
            if (Array.isArray(omitPrefix)) {
                matches = omitPrefix.some((prefix) => key.toLowerCase().startsWith(prefix.toLowerCase()));
            }
            else {
                matches = key.toLowerCase().startsWith(omitPrefix.toLowerCase());
            }
            if (matches)
                continue;
        }
        if (key.includes('__')) {
            const path = key
                .split('__')
                .map((key, index) => (index === 0 ? transform(transform(key.slice(prefix.length))) : transform(key)));
            set(config, path.join('.'), value);
        }
        else {
            config[transform(key.slice(prefix.length))] = value;
        }
    }
    return config;
    function transform(key) {
        if (type === 'camelcase') {
            return camelcase(key, { locale: false });
        }
        else if (type === 'underscore') {
            return key.toLowerCase();
        }
        return key;
    }
}

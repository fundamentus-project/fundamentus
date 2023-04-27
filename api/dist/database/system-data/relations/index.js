import { merge } from 'lodash-es';
import { requireYAML } from '../../../utils/require-yaml.js';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const systemData = requireYAML(resolve(__dirname, './relations.yaml'));
export const systemRelationRows = systemData.data.map((row) => {
    return merge({ system: true }, systemData.defaults, row);
});

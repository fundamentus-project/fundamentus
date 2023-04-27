import { merge } from 'lodash-es';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { requireYAML } from '../../../utils/require-yaml.js';
const defaults = {
    role: null,
    permissions: {},
    validation: null,
    presets: null,
    fields: ['*'],
    system: true,
};
const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPermissionsRaw = requireYAML(path.resolve(__dirname, './schema-access-permissions.yaml'));
const permissions = requireYAML(path.resolve(__dirname, './app-access-permissions.yaml'));
export const schemaPermissions = schemaPermissionsRaw.map((row) => merge({}, defaults, row));
export const appAccessMinimalPermissions = [...schemaPermissions, ...permissions].map((row) => merge({}, defaults, row));

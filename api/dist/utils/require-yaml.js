import fse from 'fs-extra';
import yaml from 'js-yaml';
export function requireYAML(filepath) {
    const yamlRaw = fse.readFileSync(filepath, 'utf8');
    return yaml.load(yamlRaw);
}

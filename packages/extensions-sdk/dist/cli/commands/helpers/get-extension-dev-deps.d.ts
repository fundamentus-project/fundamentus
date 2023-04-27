import type { ExtensionType } from '@directus/types';
import type { Language } from '../../types.js';
export default function getExtensionDevDeps(type: ExtensionType | ExtensionType[], language?: Language | Language[]): Promise<Record<string, string>>;

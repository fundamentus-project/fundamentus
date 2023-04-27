import { EXTENSION_LANGUAGES } from '@directus/constants';
export function isLanguage(language) {
    return EXTENSION_LANGUAGES.includes(language);
}
export function languageToShort(language) {
    if (language === 'javascript') {
        return 'js';
    }
    else {
        return 'ts';
    }
}
export function getLanguageFromPath(path) {
    const fileExtension = path.substring(path.lastIndexOf('.') + 1);
    if (fileExtension === 'js') {
        return 'javascript';
    }
    else if (fileExtension === 'ts') {
        return 'typescript';
    }
    else {
        return fileExtension;
    }
}

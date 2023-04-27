import { marked } from 'marked';
import sanitizeHTML from 'sanitize-html';
/**
 * Render and sanitize a markdown string
 */
export function md(str) {
    return sanitizeHTML(marked(str));
}

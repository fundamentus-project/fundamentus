/**
 * Returns the byte size for a given input string
 */
export function stringByteSize(string) {
    return Buffer.byteLength(string, 'utf-8');
}

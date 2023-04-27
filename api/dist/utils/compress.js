import { compress as compressSnappy, uncompress as uncompressSnappy } from 'snappy';
import { compress as compressJSON, decompress as decompressJSON } from '@directus/utils';
export async function compress(raw) {
    if (!raw)
        return raw;
    return await compressSnappy(compressJSON(raw));
}
export async function decompress(compressed) {
    if (!compressed)
        return compressed;
    return decompressJSON((await uncompressSnappy(compressed, { asBuffer: false })));
}

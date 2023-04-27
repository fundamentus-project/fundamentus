import { BlobServiceClient, ContainerClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { normalizePath } from '@directus/utils';
import { join } from 'node:path';
export class DriverAzure {
    containerClient;
    signedCredentials;
    root;
    constructor(config) {
        this.signedCredentials = new StorageSharedKeyCredential(config.accountName, config.accountKey);
        const client = new BlobServiceClient(config.endpoint ?? `https://${config.accountName}.blob.core.windows.net`, this.signedCredentials);
        this.containerClient = client.getContainerClient(config.containerName);
        this.root = config.root ? normalizePath(config.root, { removeLeading: true }) : '';
    }
    fullPath(filepath) {
        return normalizePath(join(this.root, filepath));
    }
    async read(filepath, range) {
        const { readableStreamBody } = await this.containerClient
            .getBlobClient(this.fullPath(filepath))
            .download(range?.start, range?.end ? range.end - (range.start || 0) : undefined);
        if (!readableStreamBody) {
            throw new Error(`No stream returned for file "${filepath}"`);
        }
        return readableStreamBody;
    }
    async write(filepath, content, type = 'application/octet-stream') {
        const blockBlobClient = this.containerClient.getBlockBlobClient(this.fullPath(filepath));
        await blockBlobClient.uploadStream(content, undefined, undefined, {
            blobHTTPHeaders: { blobContentType: type },
        });
    }
    async delete(filepath) {
        await this.containerClient.getBlockBlobClient(this.fullPath(filepath)).deleteIfExists();
    }
    async stat(filepath) {
        const props = await this.containerClient.getBlobClient(this.fullPath(filepath)).getProperties();
        return {
            size: props.contentLength,
            modified: props.lastModified,
        };
    }
    async exists(filepath) {
        return await this.containerClient.getBlockBlobClient(this.fullPath(filepath)).exists();
    }
    async move(src, dest) {
        await this.copy(src, dest);
        await this.containerClient.getBlockBlobClient(this.fullPath(src)).deleteIfExists();
    }
    async copy(src, dest) {
        const source = this.containerClient.getBlockBlobClient(this.fullPath(src));
        const target = this.containerClient.getBlockBlobClient(this.fullPath(dest));
        const poller = await target.beginCopyFromURL(source.url);
        await poller.pollUntilDone();
    }
    async *list(prefix = '') {
        const blobs = this.containerClient.listBlobsFlat({
            prefix: this.fullPath(prefix),
        });
        for await (const blob of blobs) {
            yield blob.name.substring(this.root.length);
        }
    }
}
export default DriverAzure;

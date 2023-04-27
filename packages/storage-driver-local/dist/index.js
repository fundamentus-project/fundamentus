import { createReadStream, createWriteStream } from 'node:fs';
import { access, copyFile, mkdir, opendir, rename, stat, unlink } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { pipeline } from 'node:stream/promises';
export class DriverLocal {
    root;
    constructor(config) {
        this.root = resolve(config.root);
    }
    fullPath(filepath) {
        return join(this.root, join(sep, filepath));
    }
    /**
     * Ensures that the directory exists. If it doesn't, it's created.
     */
    async ensureDir(dirpath) {
        await mkdir(dirpath, { recursive: true });
    }
    async read(filepath, range) {
        const options = {};
        if (range?.start) {
            options.start = range.start;
        }
        if (range?.end) {
            options.end = range.end;
        }
        return createReadStream(this.fullPath(filepath), options);
    }
    async stat(filepath) {
        const statRes = await stat(this.fullPath(filepath));
        if (!statRes) {
            throw new Error(`File "${filepath}" doesn't exist.`);
        }
        return {
            size: statRes.size,
            modified: statRes.mtime,
        };
    }
    async exists(filepath) {
        return access(this.fullPath(filepath))
            .then(() => true)
            .catch(() => false);
    }
    async move(src, dest) {
        const fullSrc = this.fullPath(src);
        const fullDest = this.fullPath(dest);
        await this.ensureDir(dirname(fullDest));
        await rename(fullSrc, fullDest);
    }
    async copy(src, dest) {
        const fullSrc = this.fullPath(src);
        const fullDest = this.fullPath(dest);
        await this.ensureDir(dirname(fullDest));
        await copyFile(fullSrc, fullDest);
    }
    async write(filepath, content) {
        const fullPath = this.fullPath(filepath);
        await this.ensureDir(dirname(fullPath));
        const writeStream = createWriteStream(fullPath);
        await pipeline(content, writeStream);
    }
    async delete(filepath) {
        const fullPath = this.fullPath(filepath);
        await unlink(fullPath);
    }
    list(prefix = '') {
        const fullPrefix = this.fullPath(prefix);
        return this.listGenerator(fullPrefix);
    }
    async *listGenerator(prefix) {
        const prefixDirectory = prefix.endsWith(sep) ? prefix : dirname(prefix);
        const directory = await opendir(prefixDirectory);
        for await (const file of directory) {
            const fileName = join(prefixDirectory, file.name);
            if (fileName.toLowerCase().startsWith(prefix.toLowerCase()) === false)
                continue;
            if (file.isFile()) {
                yield relative(this.root, fileName);
            }
            if (file.isDirectory()) {
                yield* this.listGenerator(join(fileName, sep));
            }
        }
    }
}
export default DriverLocal;

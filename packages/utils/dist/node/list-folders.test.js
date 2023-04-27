import path from 'path';
import { dirSync } from 'tmp';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { listFolders } from './list-folders.js';
describe('', () => {
    let rootDir;
    let childDir;
    beforeEach(() => {
        rootDir = dirSync({ unsafeCleanup: true, tmpdir: './' });
        childDir = dirSync({ tmpdir: rootDir.name });
    });
    afterEach(() => {
        rootDir.removeCallback();
    });
    it('returns all the subdirectories of the current directory', async () => {
        const childPath = childDir.name.split(path.sep);
        expect(await listFolders(rootDir.name)).toStrictEqual([childPath[childPath?.length - 1]]);
    });
});

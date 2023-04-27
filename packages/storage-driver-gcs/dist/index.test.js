import { normalizePath } from '@directus/utils';
import { Bucket, Storage } from '@google-cloud/storage';
import { randDirectoryPath, randFilePath, randFileType, randGitBranch as randBucket, randGitShortSha as randUnique, randNumber, randPastDate, randText, randUrl, } from '@ngneat/falso';
import { join } from 'node:path';
import { PassThrough } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { DriverGCS } from './index.js';
vi.mock('@directus/utils/node');
vi.mock('@directus/utils');
vi.mock('@google-cloud/storage');
vi.mock('node:path');
vi.mock('node:stream/promises');
let sample;
let driver;
beforeEach(() => {
    sample = {
        config: {
            root: randDirectoryPath(),
            apiEndpoint: randUrl(),
            bucket: randBucket(),
        },
        path: {
            input: randUnique() + randFilePath(),
            inputFull: randUnique() + randFilePath(),
            src: randUnique() + randFilePath(),
            srcFull: randUnique() + randFilePath(),
            dest: randUnique() + randFilePath(),
            destFull: randUnique() + randFilePath(),
        },
        range: {
            start: randNumber(),
            end: randNumber(),
        },
        stream: new PassThrough(),
        text: randText(),
        file: {
            type: randFileType(),
            size: randNumber(),
            modified: randPastDate(),
        },
    };
    driver = new DriverGCS({
        bucket: sample.config.bucket,
    });
    driver['fullPath'] = vi.fn().mockImplementation((input) => {
        if (input === sample.path.src)
            return sample.path.srcFull;
        if (input === sample.path.dest)
            return sample.path.destFull;
        if (input === sample.path.input)
            return sample.path.inputFull;
        return '';
    });
});
afterEach(() => {
    vi.resetAllMocks();
});
describe('#constructor', () => {
    test('Defaults root path to empty string', () => {
        expect(driver['root']).toBe('');
    });
    test('Normalizes config path when root is given', () => {
        new DriverGCS({
            bucket: sample.config.bucket,
            root: sample.config.root,
        });
        expect(normalizePath).toHaveBeenCalledWith(sample.config.root, { removeLeading: true });
    });
    test('Instantiates Storage object with config options', () => {
        new DriverGCS({
            bucket: sample.config.bucket,
            apiEndpoint: sample.config.apiEndpoint,
        });
        expect(Storage).toHaveBeenCalledWith({ apiEndpoint: sample.config.apiEndpoint });
    });
    test('Creates bucket access instance', () => {
        const mockBucket = {};
        const mockStorage = {
            bucket: vi.fn().mockReturnValue(mockBucket),
        };
        vi.mocked(Storage).mockReturnValue(mockStorage);
        const driver = new DriverGCS({
            bucket: sample.config.bucket,
        });
        expect(mockStorage.bucket).toHaveBeenCalledWith(sample.config.bucket);
        expect(driver['bucket']).toBe(mockBucket);
    });
});
describe('#fullPath', () => {
    beforeEach(() => {
        driver = new DriverGCS({ bucket: sample.config.bucket });
        driver['root'] = sample.config.root;
        vi.mocked(join).mockReturnValue(sample.path.src);
        vi.mocked(normalizePath).mockReturnValue(sample.path.inputFull);
    });
    test('Returns normalized joined path', () => {
        const result = driver['fullPath'](sample.path.input);
        expect(join).toHaveBeenCalledWith(sample.config.root, sample.path.input);
        expect(normalizePath).toHaveBeenCalledWith(sample.path.src);
        expect(result).toBe(sample.path.inputFull);
    });
});
describe('#file', () => {
    let mockFile;
    beforeEach(() => {
        mockFile = {};
        driver['bucket'] = {
            file: vi.fn().mockReturnValue(mockFile),
        };
    });
    test('Returns file instance', () => {
        const file = driver['file']('/path/to/file');
        expect(file).toBe(mockFile);
    });
});
describe('#read', () => {
    let mockFile;
    beforeEach(() => {
        mockFile = {
            createReadStream: vi.fn().mockReturnValue(sample.stream),
        };
        driver['file'] = vi.fn().mockReturnValue(mockFile);
    });
    test('Gets file reference', async () => {
        await driver.read(sample.path.input);
        expect(driver['file']).toHaveBeenCalledWith(sample.path.inputFull);
    });
    test('Returns stream from createReadStream', async () => {
        const stream = await driver.read(sample.path.input);
        expect(stream).toBe(sample.stream);
        expect(mockFile.createReadStream).toHaveBeenCalledOnce();
        expect(mockFile.createReadStream).toHaveBeenCalledWith(undefined);
    });
    test('Passes optional range to createReadStream', async () => {
        await driver.read('/path/to/file', { start: sample.range.start });
        expect(mockFile.createReadStream).toHaveBeenCalledWith({ start: sample.range.start });
        await driver.read('/path/to/file', sample.range);
        expect(mockFile.createReadStream).toHaveBeenCalledWith(sample.range);
        await driver.read('/path/to/file', { end: sample.range.end });
        expect(mockFile.createReadStream).toHaveBeenCalledWith({ end: sample.range.end });
    });
});
describe('#write', () => {
    let mockWriteStream;
    let mockCreateWriteStream;
    let mockSave;
    let mockFile;
    beforeEach(() => {
        mockWriteStream = new PassThrough();
        mockCreateWriteStream = vi.fn().mockReturnValue(mockWriteStream);
        mockSave = vi.fn();
        mockFile = {
            createWriteStream: mockCreateWriteStream,
            save: mockSave,
        };
        driver['file'] = vi.fn().mockReturnValue(mockFile);
    });
    test('Gets file reference for filepath', async () => {
        await driver.write(sample.path.input, sample.stream);
        expect(driver['file']).toHaveBeenCalledWith(sample.path.inputFull);
    });
    test('Pipes read stream to write stream in pipeline when stream is passed', async () => {
        await driver.write(sample.path.inputFull, sample.stream);
        expect(mockCreateWriteStream).toHaveBeenCalledWith({ resumable: false });
        expect(pipeline).toHaveBeenCalledWith(sample.stream, mockWriteStream);
    });
});
describe('#delete', () => {
    let mockFile;
    beforeEach(() => {
        mockFile = {
            delete: vi.fn(),
        };
        driver['file'] = vi.fn().mockReturnValue(mockFile);
    });
    test('Gets file reference', async () => {
        await driver.delete(sample.path.input);
        expect(driver['file']).toHaveBeenCalledWith(sample.path.inputFull);
    });
    test('Calls delete on file', async () => {
        await driver.delete(sample.path.input);
        expect(mockFile.delete).toHaveBeenCalledOnce();
        expect(mockFile.delete).toHaveBeenCalledWith();
    });
});
describe('#stat', () => {
    let mockFile;
    beforeEach(() => {
        mockFile = {
            getMetadata: vi.fn().mockResolvedValue([{ size: sample.file.size, updated: sample.file.modified }]),
        };
        driver['file'] = vi.fn().mockReturnValue(mockFile);
    });
    test('Gets file reference', async () => {
        await driver.stat(sample.path.input);
        expect(driver['file']).toHaveBeenCalledWith(sample.path.inputFull);
    });
    test('Calls getMetadata on file', async () => {
        await driver.stat(sample.path.input);
        expect(mockFile.getMetadata).toHaveBeenCalledOnce();
        expect(mockFile.getMetadata).toHaveBeenCalledWith();
    });
    test('Returns size/updated as size/modified from metadata response', async () => {
        const result = await driver.stat(sample.path.input);
        expect(result).toStrictEqual({
            size: sample.file.size,
            modified: sample.file.modified,
        });
    });
});
describe('#exists', () => {
    let mockFile;
    beforeEach(() => {
        mockFile = {
            exists: vi.fn().mockResolvedValue([true]),
        };
        driver['file'] = vi.fn().mockReturnValue(mockFile);
    });
    test('Gets file reference', async () => {
        driver.exists(sample.path.input);
        expect(driver['file']).toHaveBeenCalledWith(sample.path.inputFull);
    });
    test('Calls exists on file', async () => {
        driver.exists(sample.path.input);
        expect(mockFile.exists).toHaveBeenCalledOnce();
        expect(mockFile.exists).toHaveBeenCalledWith();
    });
    test('Returns boolean from response array', async () => {
        const result = await driver.exists(sample.path.input);
        expect(result).toBe(true);
    });
});
describe('#move', () => {
    let mockFileSrc;
    let mockFileDest;
    beforeEach(() => {
        mockFileSrc = {
            move: vi.fn(),
        };
        mockFileDest = {};
        driver['file'] = vi.fn().mockImplementation((path) => {
            if (path === sample.path.srcFull)
                return mockFileSrc;
            if (path === sample.path.destFull)
                return mockFileDest;
            return null;
        });
    });
    test('Gets file references', async () => {
        await driver.move(sample.path.src, sample.path.dest);
        expect(driver['file']).toHaveBeenCalledWith(sample.path.srcFull);
        expect(driver['file']).toHaveBeenCalledWith(sample.path.destFull);
    });
    test('Passes dest file ref to move function', async () => {
        await driver.move(sample.path.src, sample.path.dest);
        expect(mockFileSrc.move).toHaveBeenCalledWith(mockFileDest);
    });
});
describe('#copy', () => {
    let mockFileSrc;
    let mockFileDest;
    beforeEach(() => {
        mockFileSrc = {
            copy: vi.fn(),
        };
        mockFileDest = {};
        driver['file'] = vi.fn().mockImplementation((path) => {
            if (path === sample.path.srcFull)
                return mockFileSrc;
            if (path === sample.path.destFull)
                return mockFileDest;
            return null;
        });
    });
    test('Gets file references', async () => {
        await driver.copy(sample.path.src, sample.path.dest);
        expect(driver['file']).toHaveBeenCalledWith(sample.path.srcFull);
        expect(driver['file']).toHaveBeenCalledWith(sample.path.destFull);
    });
    test('Passes dest file ref to copy function', async () => {
        await driver.copy(sample.path.src, sample.path.dest);
        expect(mockFileSrc.copy).toHaveBeenCalledWith(mockFileDest);
    });
});
describe('#list', () => {
    let mockFiles;
    beforeEach(() => {
        mockFiles = randFilePath({ length: randNumber({ min: 1, max: 10 }) });
        driver['bucket'] = {
            getFiles: vi.fn(),
        };
        mockFiles.forEach((file, index) => {
            vi.mocked(driver['bucket'].getFiles).mockResolvedValueOnce([
                [{ name: file }],
                index === mockFiles.length - 1 ? undefined : {},
            ]);
        });
    });
    test('Calls getFiles with correct options', async () => {
        await driver.list().next();
        expect(driver['bucket'].getFiles).toHaveBeenCalledWith({
            prefix: '',
            autoPaginate: false,
            maxResults: 500,
        });
    });
    test('Gets full path of optional prefix', async () => {
        await driver.list(sample.path.input).next();
        expect(driver['bucket'].getFiles).toHaveBeenCalledWith({
            prefix: sample.path.inputFull,
            autoPaginate: false,
            maxResults: 500,
        });
    });
    test('Yields all paginated files', async () => {
        const output = [];
        for await (const filepath of driver.list()) {
            output.push(filepath);
        }
        expect(output).toStrictEqual(mockFiles);
    });
});

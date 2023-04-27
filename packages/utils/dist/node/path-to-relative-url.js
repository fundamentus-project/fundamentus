import path from 'path';
export function pathToRelativeUrl(filePath, root = '.') {
    return path.relative(root, filePath).split(path.sep).join(path.posix.sep);
}

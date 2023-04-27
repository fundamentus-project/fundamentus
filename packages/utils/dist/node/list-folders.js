import path from 'path';
import fse from 'fs-extra';
export async function listFolders(location) {
    const fullPath = path.resolve(location);
    const files = await fse.readdir(fullPath);
    const directories = [];
    for (const file of files) {
        const filePath = path.join(fullPath, file);
        const stats = await fse.stat(filePath);
        if (stats.isDirectory()) {
            directories.push(file);
        }
    }
    return directories;
}

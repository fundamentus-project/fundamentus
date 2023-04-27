import { getEnv } from '../env.js';
import { getStorageDriver } from './get-storage-driver.js';
export const registerDrivers = async (storage) => {
    const env = getEnv();
    const usedDrivers = [];
    for (const [key, value] of Object.entries(env)) {
        if ((key.startsWith('STORAGE_') && key.endsWith('_DRIVER')) === false)
            continue;
        if (value && usedDrivers.includes(value) === false)
            usedDrivers.push(value);
    }
    for (const driverName of usedDrivers) {
        const storageDriver = await getStorageDriver(driverName);
        if (storageDriver) {
            storage.registerDriver(driverName, storageDriver);
        }
    }
};

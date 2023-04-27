export class StorageManager {
    drivers = new Map();
    locations = new Map();
    registerDriver(name, driver) {
        this.drivers.set(name, driver);
    }
    registerLocation(name, config) {
        const driverName = config.driver;
        const Driver = this.drivers.get(driverName);
        if (!Driver) {
            throw new Error(`Driver "${driverName}" isn't registered.`);
        }
        this.locations.set(name, new Driver(config.options));
    }
    location(name) {
        const driver = this.locations.get(name);
        if (!driver) {
            throw new Error(`Location "${name}" doesn't exist.`);
        }
        return driver;
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const rxfs_1 = require("rxfs");
const path = require("path");
const driver_1 = require("./driver");
exports.castDriver = (driver, ...args) => {
    if (driver_1.isDriver(driver)) {
        const reader = new driver.Reader(...args);
        const writer = new driver.Writer(...args);
        return {
            reader,
            writer
        };
    }
    if (driver_1.isDriverInterface(driver)) {
        return driver;
    }
    if (driver_1.isDriverKey(driver)) {
        return exports.castDriver(driver_1.DriverTypes[driver], ...args);
    }
    if (rxfs_1.existsSync(driver)) {
        const ext = path.extname(driver);
        if (driver_1.isDriverKey(ext)) {
            return exports.castDriver(ext, driver, ...args);
        }
    }
};
class NodeEnvProvider extends common_1.EnvProvider {
    constructor(driver) {
        super();
        this.driver = exports.castDriver(driver);
        console.log('NodeEnvProvider with driver', this.driver, '\nOriginal', driver);
    }
    read() {
        return this.driver.reader.read()
            .map(sourceData => JSON.parse(sourceData));
    }
    write(data) {
        const writer = this.driver.writer;
        return writer.write(writer.encodeData(data));
    }
}
exports.NodeEnvProvider = NodeEnvProvider;
//# sourceMappingURL=provider.node.class.js.map
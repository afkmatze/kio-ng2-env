"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("./json");
const writer_1 = require("./writer");
exports.EnvWriter = writer_1.EnvWriter;
const reader_1 = require("./reader");
exports.EnvReader = reader_1.EnvReader;
exports.isDriverConstructor = (other) => {
    return ('function' === typeof other
        &&
            /.*Reader$/.test(other.name)
        &&
            /.*Writer$/.test(other.name));
};
exports.isDriver = (other) => {
    return (other &&
        (other["Reader"]
            &&
                exports.isDriverConstructor(other.Reader))
        &&
            (other["Writer"]
                &&
                    exports.isDriverConstructor(other.Writer)));
};
exports.DriverTypes = {
    'json': {
        Reader: json_1.JSONReader,
        Writer: json_1.JSONWriter
    }
};
exports.isDriverKey = (key) => {
    return ('string' === typeof key
        &&
            key in exports.DriverTypes);
};
exports.createReader = (driverType, ...args) => {
    const Driver = exports.DriverTypes[driverType].Reader;
    return new Driver(...args);
};
exports.createWriter = (driverType, ...args) => {
    const Driver = exports.DriverTypes[driverType].Writer;
    return new Driver(...args);
};
exports.isDriverInterface = (other) => {
    return ((other['reader']
        &&
            other.reader instanceof reader_1.EnvReader)
        &&
            (other['writer']
                &&
                    other.writer instanceof writer_1.EnvWriter));
};
//# sourceMappingURL=index.js.map
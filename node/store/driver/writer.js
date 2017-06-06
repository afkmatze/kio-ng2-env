"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isToEncodedStringMethod = (method) => {
    return (method.length > 0
        &&
            method.name === 'toString');
};
const isToStringMethod = (method) => {
    return (method.length === 0
        &&
            method.name === 'toString');
};
class EnvWriter {
    constructor() { }
    encodeData(data) {
        if ('string' === typeof data) {
            return data;
        }
        if ('function' === typeof data.toString) {
            const toStringMethod = data.toString;
            if (isToStringMethod(toStringMethod)) {
                return toStringMethod();
            }
            else {
                return toStringMethod('utf8');
            }
        }
        return JSON.stringify(data, null, '  ');
    }
}
exports.EnvWriter = EnvWriter;
//# sourceMappingURL=writer.js.map
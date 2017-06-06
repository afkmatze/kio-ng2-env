"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnvReader {
    constructor() { }
    decodeData(source) {
        if (source instanceof Buffer) {
            return this.decodeData(source.toString('utf8'));
        }
        return JSON.parse(source);
    }
}
exports.EnvReader = EnvReader;
//# sourceMappingURL=reader.js.map
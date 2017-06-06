"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reader_1 = require("../reader");
const rxfs_1 = require("rxfs");
class JSONReader extends reader_1.EnvReader {
    constructor(filepath) {
        super();
        this.filepath = filepath;
    }
    decodeData(data) {
        return JSON.parse(data);
    }
    read() {
        return rxfs_1.readFile(this.filepath, 'utf8')
            .toArray()
            .map(rows => rows.map(row => row.toString('utf8')).join('\n'))
            .map(jsonData => JSON.parse(jsonData));
    }
}
exports.JSONReader = JSONReader;
//# sourceMappingURL=reader.js.map
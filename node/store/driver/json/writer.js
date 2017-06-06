"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const writer_file_1 = require("../writer.file");
const fs_1 = require("fs");
const read = (filepath) => {
    return new Promise((resolve, reject) => {
        fs_1.readFile(filepath, 'utf8', (error, content) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(content);
            }
        });
    });
};
const write = (filepath, content) => {
    return new Promise((resolve, reject) => {
        fs_1.writeFile(filepath, 'utf8', (error, content) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(content);
            }
        });
    });
};
const readJSON = (filepath) => read(filepath).then(JSON.parse);
class JSONWriter extends writer_file_1.FileWriter {
    encodeData(data) {
        return JSON.stringify(data, null, '  ');
    }
}
exports.JSONWriter = JSONWriter;
//# sourceMappingURL=writer.js.map
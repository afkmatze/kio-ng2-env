"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const writer_1 = require("./writer");
const rxjs_1 = require("rxjs");
const fs_1 = require("fs");
const write = (filepath, content) => {
    return new Promise((resolve, reject) => {
        fs_1.writeFile(filepath, content, 'utf8', (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
};
class FileWriter extends writer_1.EnvWriter {
    constructor(filepath) {
        super();
        this.filepath = filepath;
    }
    writeFile(data, filepath = this.filepath) {
        if (!data) {
            return rxjs_1.Observable.throw(Error('Invalid content'));
        }
        const fileContent = this.encodeData(data);
        return rxjs_1.Observable.fromPromise(write(filepath, fileContent)).map(() => true);
    }
    write(data) {
        if ('string' === typeof data) {
            return this.writeFile(data, this.filepath);
        }
        return this.write(this.encodeData(data));
    }
}
exports.FileWriter = FileWriter;
//# sourceMappingURL=writer.file.js.map
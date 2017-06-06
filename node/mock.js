"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rxfs_1 = require("rxfs");
const rxjs_1 = require("rxjs");
exports.encodeJSON = (data) => JSON.stringify(data, null, '  ');
exports.decodeJSON = (data) => JSON.parse(data);
var file;
(function (file) {
    file.read = (filepath) => {
        return rxjs_1.Observable.fromPromise(new Promise((resolve, reject) => {
            fs.readFile(filepath, 'utf8', (error, result) => {
                error ? reject(error) : resolve(result);
            });
        }));
    };
    file.name = (fileType, prefix = 'tmp.') => {
        const ext = fileType ? '.' + fileType : '';
        return `${prefix}${Date.now()}${ext}`;
    };
})(file = exports.file || (exports.file = {}));
/**
 * @brief      mock json file with default content
 *
 * @param      defaultContent  data to write in json format
 *
 * @return     filepath of temporary file
 */
exports.mockJSONFile = (defaultContent) => {
    return rxfs_1.tmp.file(exports.encodeJSON(defaultContent), true);
};
exports.toJSON = (value) => {
    if ('string' === typeof value) {
        return JSON.parse(value);
    }
    return value;
};
exports.toJSONValue = (value) => {
    return JSON.stringify(exports.toJSON(value));
};
//# sourceMappingURL=mock.js.map
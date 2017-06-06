"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const fs = require("fs");
const prom = (callable) => (...args) => new Promise((resolve, reject) => {
    callable(...args, (error, payload) => {
        error ? reject(error) : resolve(payload);
    });
});
const obs = (callable) => (...args) => rxjs_1.Observable.fromPromise(prom(callable)(...args));
function readFile(filepath, encoding) {
    if (encoding) {
        return obs(fs.readFile)(filepath, encoding);
    }
    return obs(fs.readFile)(filepath);
}
exports.readFile = readFile;
//# sourceMappingURL=fs.js.map
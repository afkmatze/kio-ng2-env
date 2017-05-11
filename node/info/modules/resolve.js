"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const rxfs_1 = require("rxfs");
const path = require("path");
const logMap = (label) => (item, idx) => {
    console.log('%s no %s\n', label, idx, item);
    return item;
};
exports.pathBefore = (dirname) => {
    const pathChunks = __dirname.split(dirname);
    return path.normalize(pathChunks[0]);
};
/**
 * resolves root path of kio-ng2-env
 * @type {[type]}
 */
exports.moduleRootPath = () => {
    return path.join(exports.pathBefore('kio-ng2-env'), 'kio-ng2-env');
};
/**
 * resolves main project root path
 * @type {[type]}
 */
exports.rootPath = () => {
    if (!module.parent) {
        throw Error('kio-ng2-env is not installed to a parent module.');
    }
    return exports.pathBefore('node_modules');
};
exports.kioModules = () => {
    const parentModulePaths = module.parent["paths"];
    return rxjs_1.Observable.from(parentModulePaths)
        .flatMap(filepath => rxfs_1.exists(filepath).map(pathExists => ({
        filepath,
        pathExists
    })))
        .filter(({ filepath, pathExists }) => pathExists === true).map(({ filepath }) => filepath)
        .concatMap(modulesPath => rxfs_1.readdir(modulesPath).filter(filepath => /^kio\-ng2/.test(filepath)));
};
//# sourceMappingURL=resolve.js.map
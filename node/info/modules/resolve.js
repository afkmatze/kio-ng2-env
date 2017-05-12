"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const rxfs_1 = require("rxfs");
const rxshell_1 = require("rxshell");
const path = require("path");
const module_1 = require("./module");
const logMap = (label) => (item, idx) => {
    console.log('%s no %s\n', label, idx, item);
    return item;
};
exports.pathBefore = (dirname) => {
    const pathChunks = __dirname.split(dirname);
    return path.normalize(pathChunks[0]).slice(0, -1);
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
exports.rootModule = () => {
    const filepath = exports.rootPath();
    return module_1.fromPath(filepath);
};
exports.modulePaths = () => {
    const parentModulePaths = module.parent["paths"];
    return rxjs_1.Observable.from(parentModulePaths)
        .flatMap(filepath => rxfs_1.exists(filepath).map(pathExists => ({
        filepath,
        pathExists
    })))
        .filter(p => p.pathExists === true).map(p => p.filepath);
};
exports.kioModulesAtPath = (modulesPath) => {
    return rxshell_1.find(['.', '-maxdepth', '1'], modulesPath).map(s => s.stdout.toString('utf8').substr(2))
        .filter(filepath => /^kio\-ng2/.test(path.basename(filepath))).distinct()
        .map(module_1.fromPath);
};
exports.kioModules = () => {
    return exports.modulePaths()
        .mergeMap(modulesPath => exports.kioModulesAtPath(modulesPath));
};
//# sourceMappingURL=resolve.js.map
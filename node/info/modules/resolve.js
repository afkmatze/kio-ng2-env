"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const rxfs_1 = require("rxfs");
const rxshell_1 = require("rxshell");
const path = require("path");
const module_1 = require("./module");
__export(require("./module"));
const logMap = (label) => (item, idx) => {
    console.log('%s no %s\n', label, idx, item);
    return item;
};
/**
 * resolves root path of kio-ng2-env
 * @type {[type]}
 */
exports.moduleRootPath = () => {
    return path.join(module_1.pathBefore('kio-ng2-env'), 'kio-ng2-env');
};
/**
 * resolves main project root path
 * @type {[type]}
 */
exports.rootPath = () => {
    if ('KIO_NG2_PROJECT' in process.env) {
        return process.env.KIO_NG2_PROJECT;
    }
    if (!module.parent) {
        throw Error('kio-ng2-env is not installed to a parent module.');
    }
    return module_1.pathBefore('node_modules', exports.moduleRootPath());
};
exports.rootModule = (defaultPath) => {
    const filepath = defaultPath || exports.rootPath();
    console.log('rootModule()', filepath);
    return module_1.fromPath(filepath);
};
exports.printModuleTree = (mod = exports.nodeRootModule(), depth = 0) => {
    console.log('|%s %s', '-'.repeat(depth), path.basename(mod.filename));
    mod.children.forEach(child => exports.printModuleTree(child, depth + 1));
};
exports.modulePathFrom = (mod, rootModule = exports.nodeRootModule(), path = []) => {
    path = [mod, ...path];
    if (mod === rootModule) {
        return path;
    }
    if (mod.parent) {
        return exports.modulePathFrom(mod.parent, rootModule, path);
    }
    return path;
};
exports.nodeRootModule = (mod = module) => {
    if (mod.parent)
        return exports.nodeRootModule(mod.parent);
    return mod;
};
exports.modulePaths = () => {
    const rootModulePath = exports.rootPath();
    const parentModulePaths = [path.join(rootModulePath, 'node_modules')];
    return rxjs_1.Observable.from(parentModulePaths)
        .flatMap(filepath => rxfs_1.exists(filepath).map(pathExists => ({
        filepath,
        pathExists
    })))
        .filter(p => p.pathExists === true).map(p => p.filepath);
};
exports.kioModulesAtPath = (modulesPath) => {
    return rxshell_1.find(['.', '-maxdepth', '1'], modulesPath).map(s => s.substr(2))
        .filter(filepath => /^kio\-ng2/.test(path.basename(filepath))).distinct()
        .map(dirname => path.join(modulesPath, dirname))
        .map(module_1.fromPath);
};
exports.kioModules = () => {
    return exports.modulePaths()
        .mergeMap(modulesPath => exports.kioModulesAtPath(modulesPath));
};
//# sourceMappingURL=resolve.js.map
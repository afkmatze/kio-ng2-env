"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { RootModuleInfo, ModuleInfo } from '../../common'
const kio_ng2_1 = require("kio-ng2");
exports.isModuleInfo = (other) => {
    return ('name' in other
        &&
            'version' in other
        &&
            'filepath' in other);
};
exports.isRootModuleInfo = (other) => {
    return ('children' in other && other.children.every(exports.isModuleInfo)
        &&
            exports.isModuleInfo(other));
};
exports.isBuildInfo = (other) => {
    return ('buildCount' in other && 'number' === typeof other.buildCount
        && 'buildTime' in other && other.buildTime instanceof Date
        && 'buildMachine' in other
        && 'buildRepository' in other);
};
exports.isProjectInfo = (info) => {
    return ('name' in info);
};
exports.isProjectProp = (key) => {
    return (key === 'rootModule'
        ||
            key === 'lastBuild'
        ||
            key === 'components'
        ||
            key === 'name');
};
exports.isProject = (info) => {
    return ('rootModule' in info && exports.isRootModuleInfo(info.rootModule)
        &&
            'lastBuild' in info && exports.isBuildInfo(info.lastBuild)
        &&
            'components' in info && Array.isArray(info.components) && info.components.every(kio_ng2_1.isNamedComponent)
        &&
            exports.isProjectInfo(info));
};
//# sourceMappingURL=project.type-checks.js.map
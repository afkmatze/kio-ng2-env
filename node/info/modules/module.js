"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.pathBefore = (dirname, source = __dirname) => {
    const pathChunks = source.split(dirname);
    return path.normalize(pathChunks[0] + '/').slice(0, -1);
};
exports.fromPath = (filepath) => {
    const moduleDir = path.join(filepath);
    const pckg = require(path.resolve(moduleDir, 'package.json'));
    return {
        name: pckg.name,
        filepath: moduleDir,
        version: pckg.version,
        repository: pckg.repository,
        kio: pckg.kio
    };
};
//# sourceMappingURL=module.js.map
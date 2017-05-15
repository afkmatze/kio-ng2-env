"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("../../common"));
const git = require("./git");
exports.git = git;
const os = require("./os");
exports.os = os;
const modules = require("./modules");
exports.modules = modules;
exports.update = (cwd, data) => {
    return git.branches(cwd)
        .filter(branch => branch.current === true)
        .concatMap(branch => {
        return modules.resolve.kioModules().toArray().map(kioModules => {
            return {
                buildCount: ((data && data.buildCount) || 0) + 1,
                buildTime: new Date(),
                buildMachine: os.machine,
                buildBranch: branch.name,
                modules: kioModules,
            };
        });
    });
};
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const git = require("./git");
exports.git = git;
const os = require("./os");
exports.os = os;
const modules = require("./modules");
exports.modules = modules;
exports.update = (data) => {
    return git.branches()
        .filter(branch => branch.current === true)
        .concatMap(branch => {
        return modules.resolve.kioModules().toArray().map(modules => {
            return {
                buildCount: ((data && data.buildCount) || 0) + 1,
                buildTime: new Date(),
                buildMachine: os.machine,
                buildBranch: branch.name,
                modules,
            };
        });
    });
};
//# sourceMappingURL=index.js.map
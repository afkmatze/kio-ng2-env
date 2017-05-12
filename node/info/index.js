"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
exports.isRepositoryType = common_1.isRepositoryType;
exports.isGIT = common_1.isGIT;
exports.isRepository = common_1.isRepository;
exports.isGitRepository = common_1.isGitRepository;
exports.isProjectInfo = common_1.isProjectInfo;
exports.isProjectRootLocation = common_1.isProjectRootLocation;
exports.EnvStore = common_1.EnvStore;
exports.EnvProvider = common_1.EnvProvider;
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const info_1 = require("../info");
const common_1 = require("../../common");
exports.updateRepositoryInfo = (repository) => {
    if (common_1.isGitRepository(repository)) {
        return info_1.git.branches().filter(b => b.current).map(branch => `${branch.name} ${branch.hash} ${branch.message}`);
    }
    return rxjs_1.Observable.empty();
};
exports.updateProject = (info) => {
    const currentInfo = info_1.modules.resolve.rootModule();
    const { buildCount = 0, buildBranch = undefined, buildMachine = undefined, buildTime = new Date(), root = info_1.modules.resolve.rootPath(), rootModule = currentInfo } = info || {};
    const nextInfo = {
        buildCount,
        buildBranch,
        buildMachine,
        buildTime,
        root,
        rootModule
    };
    const mergeRepoInfo = exports.updateRepositoryInfo(nextInfo.rootModule.repository);
    return mergeRepoInfo.map(buildBranch => (Object.assign({}, nextInfo, { buildCount: buildCount + 1, buildBranch })));
};
//# sourceMappingURL=updateInfo.js.map
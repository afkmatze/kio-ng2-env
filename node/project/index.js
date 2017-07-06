"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const path = require("path");
const info_1 = require("../info");
exports.getRepositoryInfo = (cwd) => {
    return info_1.git.branches(cwd).map(b => {
        return b;
    })
        .filter(branch => branch.current === true)
        .flatMap(branch => {
        return info_1.git.commits(cwd).toArray().map(commits => {
            return {
                branch,
                commit: commits.find(commit => commit.hash === branch.commit)
            };
        });
    });
};
exports.getBuildInfo = (cwd) => {
    return exports.getRepositoryInfo(cwd).map(buildRepository => {
        const info = {
            buildCount: 0,
            buildTime: new Date(),
            buildMachine: info_1.os.machine,
            buildRepository
        };
        return info;
    });
};
exports.projectConfigFile = (projectPath) => {
    const rootModule = info_1.modules.resolve.fromPath(projectPath);
    const configFilename = rootModule.name + '.json';
    return path.join(projectPath, configFilename);
};
exports.project = (projectPath) => {
    const rootModule = info_1.modules.resolve.fromPath(projectPath);
    if (!('kio' in rootModule)) {
        return rxjs_1.Observable.throw(`Please set kio folder configuration in "${projectPath}/package.json".`);
    }
    return exports.getBuildInfo(projectPath).flatMap(lastBuild => {
        return info_1.modules.resolve.kioModules().toArray().map(kioModules => {
            return {
                name: rootModule.name,
                rootModule: Object.assign({}, rootModule, { children: kioModules.filter(mod => mod.name !== rootModule.name) }),
                lastBuild,
                folders: rootModule.kio,
                components: []
            };
        });
    });
};
//# sourceMappingURL=index.js.map
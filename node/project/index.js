"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const path = require("path");
const debug = require("../debug");
const info_1 = require("../info");
exports.getRepositoryInfo = (cwd) => {
    return info_1.git.branches(cwd).map(b => {
        debug.log('branch ', b);
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
    const infoPromise = exports.getRepositoryInfo(cwd).map(buildRepository => {
        const info = {
            buildCount: 0,
            buildTime: new Date(),
            buildMachine: info_1.os.machine,
            buildRepository
        };
        return info;
    }).toPromise();
    return rxjs_1.Observable.fromPromise(infoPromise).flatMap(info => {
        if ('undefined' === typeof info) {
            return rxjs_1.Observable.throw(new Error(`Failed to get build info at "${cwd}"`));
        }
        return rxjs_1.Observable.of(info);
    });
};
exports.projectConfigFile = (projectPath) => {
    const rootModule = info_1.modules.resolve.fromPath(projectPath);
    const configFilename = rootModule.name + '.json';
    return path.join(projectPath, configFilename);
};
exports.project = (projectPath) => {
    const rootModule = info_1.modules.resolve.fromPath(projectPath);
    debug.log('init project at "%s"', projectPath);
    if (!('kio' in rootModule)) {
        return rxjs_1.Observable.throw(`Please set kio folder configuration in "${projectPath}/package.json".`);
    }
    return exports.getBuildInfo(projectPath).flatMap(lastBuild => {
        debug.log('last build: ', lastBuild);
        return info_1.modules.resolve.kioModules().toArray().map(kioModules => {
            return {
                name: rootModule.name,
                rootModule: Object.assign({}, rootModule, { children: kioModules.filter(mod => mod.name !== rootModule.name) }),
                lastBuild,
                folders: rootModule.kio,
                components: []
            };
        });
    })
        .catch(error => {
        return rxjs_1.Observable.throw(new Error(`Failed to get build info for "${projectPath}". ${error}`));
    });
};
//# sourceMappingURL=index.js.map
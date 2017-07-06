"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const path = require("path");
const rxfs_1 = require("rxfs");
const project_1 = require("./project");
const info_1 = require("./info");
exports.initEnvironment = (projectPath) => {
    return project_1.project(projectPath).map(projectData => {
        const projectModule = info_1.modules.resolve.fromPath(projectPath);
        const projectName = projectModule.name;
        const projectEnvFile = path.join(projectPath, `${projectName}.json`);
        if (rxfs_1.existsSync(projectEnvFile)) {
            const projectEnv = require(projectEnvFile);
            return rxjs_1.Observable.of(Object.assign({}, projectData, projectEnv));
        }
        else {
            const contentSource = JSON.stringify(projectData, null, '  ').split('\n').map(row => new Buffer(row));
            return rxfs_1.writeFile(projectEnvFile, rxjs_1.Observable.from(contentSource), 'utf8').map(success => {
                return projectData;
            });
        }
    });
};
//# sourceMappingURL=init.js.map
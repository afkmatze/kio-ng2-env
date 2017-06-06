"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const provider_node_class_1 = require("./store/provider.node.class");
const common_1 = require("../common");
__export(require("../common"));
//import { updateProject } from './actions/updateInfo'
__export(require("./project"));
const project_1 = require("./project");
const info_1 = require("./info");
exports.createProvider = (filepath) => new provider_node_class_1.NodeEnvProvider(filepath);
//export const createStore = (defaultData?:Project|Observable<Project>):EnvStore<Project> => {
exports.createStore = (projectData) => {
    const filepath = project_1.projectPath(projectData)(common_1.ProjectPath.envFile);
    const provider = exports.createProvider(filepath);
    return new common_1.EnvStore(provider, projectData);
};
exports.api = {
    git: info_1.git, os: info_1.os, modules: info_1.modules //, updateProject
};
exports.env = (projectPath = info_1.modules.resolve.rootPath()) => {
    return project_1.project(projectPath)
        .flatMap(projectData => {
        console.log('create env with project data', projectData);
        return exports.createStore(projectData).load();
    });
};
exports.default = exports.env;
//# sourceMappingURL=index.js.map
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const provider_class_1 = require("./store/provider.class");
const common_1 = require("../common");
__export(require("../common"));
//import { updateProject } from './actions/updateInfo'
__export(require("./project"));
const project_1 = require("./project");
const info_1 = require("./info");
exports.createProvider = (filepath) => new provider_class_1.NodeEnvProvider(filepath);
exports.createStore = (defaultData) => {
    const filepath = path.join(info_1.modules.resolve.rootPath(), info_1.modules.resolve.rootModule().name + '.json');
    return new common_1.EnvStore(exports.createProvider(filepath), defaultData);
};
exports.api = {
    git: info_1.git, os: info_1.os, modules: info_1.modules //, updateProject
};
exports.env = (projectPath = info_1.modules.resolve.rootPath()) => {
    return project_1.project(projectPath)
        .map(exports.createStore)
        .flatMap(store => {
        return store.load();
    })
        .flatMap(store => {
        return store.save().mapTo(store);
    });
};
//# sourceMappingURL=index.js.map
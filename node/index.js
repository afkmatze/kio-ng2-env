"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const provider_class_1 = require("./store/provider.class");
const common_1 = require("../common");
const info_1 = require("./info");
exports.createProvider = () => new provider_class_1.NodeEnvProvider();
exports.createStore = () => {
    exports.globalStore = exports.globalStore || new common_1.EnvStore(exports.createProvider());
    return exports.globalStore;
};
exports.api = {
    git: info_1.git, os: info_1.os, modules: info_1.modules, update: info_1.update
};
//# sourceMappingURL=index.js.map
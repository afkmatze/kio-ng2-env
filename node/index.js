"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const provider_class_1 = require("./store/provider.class");
const common_1 = require("../common");
const prebuild_1 = require("./store/commands/prebuild");
exports.createProvider = () => new provider_class_1.NodeEnvProvider();
exports.createStore = () => {
    exports.globalStore = exports.globalStore || new common_1.EnvStore(exports.createProvider());
    return exports.globalStore;
};
exports.api = {
    prebuild: () => prebuild_1.command(exports.globalStore)
};
//# sourceMappingURL=index.js.map
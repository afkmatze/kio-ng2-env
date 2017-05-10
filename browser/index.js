"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const provider_class_1 = require("./store/provider.class");
const common_1 = require("../common");
exports.createProvider = () => new provider_class_1.BrowserEnvProvider();
exports.createStore = () => new common_1.EnvStore(exports.createProvider());
//# sourceMappingURL=index.js.map
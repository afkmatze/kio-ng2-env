"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * kio-ng2-env for browser
 * @module kio-ng2-env/browser
 */
const provider_class_1 = require("./store/provider.class");
const common_1 = require("../common");
__export(require("./store/provider.class"));
exports.createProvider = () => new provider_class_1.BrowserEnvProvider();
exports.createStore = () => new common_1.EnvStore(exports.createProvider());
//# sourceMappingURL=index.js.map
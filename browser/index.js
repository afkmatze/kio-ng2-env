"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const provider_class_1 = require("./store/provider.class");
const common_1 = require("../common");
__export(require("./store/provider.class"));
exports.createProvider = () => new provider_class_1.BrowserEnvProvider();
exports.createStore = () => new common_1.EnvStore(exports.createProvider());
const syncObservable = (obs) => {
    let data;
    let err;
    obs.subscribe(result => {
        data = result;
    }, error => {
        err = error;
    });
    while (!data && !err) {
        true;
    }
    if (err) {
        throw Error(err);
    }
    return data;
};
const defaultStore = exports.createStore();
exports.default = syncObservable(defaultStore.load());
//# sourceMappingURL=index.js.map
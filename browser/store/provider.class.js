"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const rxjs_1 = require("rxjs");
const common_1 = require("../../common");
//const envDataPath = require.resolve
const envData = require('../../kio-ng2-env.json');
const ROOT_DIR = path.resolve('./');
class BrowserEnvProvider extends common_1.EnvProvider {
    read() {
        return rxjs_1.Observable.of(envData);
    }
}
exports.BrowserEnvProvider = BrowserEnvProvider;
//# sourceMappingURL=provider.class.js.map
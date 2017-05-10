"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const common_1 = require("../../common");
const envData = require(common_1.ENV_FILEPATH);
const ROOT_DIR = path.resolve('./');
class BrowserEnvProvider extends common_1.EnvProvider {
    read() {
        return Promise.resolve(envData);
    }
}
exports.BrowserEnvProvider = BrowserEnvProvider;
//# sourceMappingURL=provider.class.js.map
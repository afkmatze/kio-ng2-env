"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnvProvider {
    write(data) {
        return Promise.reject('env can not be written by provider.');
    }
}
exports.EnvProvider = EnvProvider;
//# sourceMappingURL=provider.class.js.map
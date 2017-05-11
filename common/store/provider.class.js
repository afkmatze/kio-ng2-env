"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnvProvider {
    create() {
        return Promise.reject('env can not be written by provider.');
    }
    write(data) {
        return Promise.reject('env can not be written by provider.');
    }
    exists() {
        return Promise.resolve(true);
    }
}
exports.EnvProvider = EnvProvider;
//# sourceMappingURL=provider.class.js.map
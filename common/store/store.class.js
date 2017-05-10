"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnvStore {
    constructor(env) {
        this.env = env;
    }
    load() {
        return this.env.read().then(data => {
            this.data = data;
            return this;
        });
    }
    save() {
        return this.env.write(this.data);
    }
}
exports.EnvStore = EnvStore;
//# sourceMappingURL=store.class.js.map
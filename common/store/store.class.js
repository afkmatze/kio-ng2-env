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
        if (!this.data) {
            throw Error('Cannot save before load');
        }
        return this.env.write(this.data);
    }
    get(key) {
        return this.data[key];
    }
    hasKey(key) {
        return key in this.data;
    }
    set(key, value) {
        if (this.hasKey(key)) {
            this.data[key] = value;
        }
        else if (value === undefined && 'object' === typeof key) {
            Object.keys(key).forEach((vKey) => {
                this.set(vKey, key[vKey]);
            });
        }
        else {
            throw Error(`Invalid key "${key}".`);
        }
    }
}
exports.EnvStore = EnvStore;
//# sourceMappingURL=store.class.js.map
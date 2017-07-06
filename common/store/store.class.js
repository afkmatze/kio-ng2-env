"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const project_1 = require("../project");
exports.isKeyOf = (key, other) => {
    return key in other;
};
exports.merge = (data, other) => {
    const keys = Object.keys(data).concat(Object.keys(other));
    keys
        .filter((key, idx) => keys.indexOf(key) === idx)
        .forEach(key => {
        if (exports.isKeyOf(key, other)) {
            data[key] = other[key];
        }
    });
    return data;
};
class EnvStore {
    constructor(env, defaultData) {
        this.env = env;
        this.defaultData = defaultData;
    }
    get data() {
        if (!this._data)
            throw Error(`Tried to access data of empty store.`);
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    getDefaultData() {
        if (this.defaultData instanceof rxjs_1.Observable) {
            return this.defaultData.map(defaultData => {
                this.defaultData = defaultData;
                return defaultData;
            });
        }
        else {
            return rxjs_1.Observable.of(this.defaultData);
        }
    }
    ensureExistance() {
        return this.env.exists()
            .flatMap(doesExist => {
            if (!doesExist) {
                console.log('env does not exist', this.defaultData);
                return this.env.create(this.getDefaultData());
            }
            return rxjs_1.Observable.of(true);
        });
    }
    mergeDefault() {
        return this.getDefaultData().map(defaultData => {
            this.data = exports.merge(defaultData, this.data);
            return this;
        });
    }
    load() {
        return this.env.read()
            .catch(error => {
            if (this.defaultData instanceof rxjs_1.Observable)
                return this.defaultData;
            return rxjs_1.Observable.of(this.defaultData);
        })
            .flatMap(data => {
            this.data = data;
            if (!project_1.isProject(data) && this.defaultData) {
                return this.mergeDefault();
            }
            return rxjs_1.Observable.of(this);
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
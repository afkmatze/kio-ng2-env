"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class EnvProvider {
    constructor(filepath) {
        this.filepath = filepath;
    }
    resolve(data) {
        if (data instanceof rxjs_1.Observable) {
            return data.share();
        }
        if (data instanceof Promise) {
            return rxjs_1.Observable.fromPromise(data);
        }
        return rxjs_1.Observable.of(data);
    }
    create(defaultData) {
        return rxjs_1.Observable.throw('env can not be written by provider.');
    }
    write(data) {
        return rxjs_1.Observable.throw('env can not be written by provider.');
    }
    exists() {
        return rxjs_1.Observable.of(true);
    }
}
exports.EnvProvider = EnvProvider;
//# sourceMappingURL=provider.class.js.map
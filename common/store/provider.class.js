"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
/**
 * @brief      environment data provider
 * @description abstract class for cross platform implementation
 */
class EnvProvider {
    constructor() { }
    resolve(data) {
        if (data instanceof rxjs_1.Observable) {
            return data.share();
        }
        if (data instanceof Promise) {
            return rxjs_1.Observable.fromPromise(data);
        }
        return rxjs_1.Observable.of(data);
    }
    /**
     * @brief      base implementation of source creation
     *
     * @param      defaultData  default data for initialization
     *
     * @return     {true} if created successfully; {false} otherwise
     */
    create(defaultData) {
        return rxjs_1.Observable.throw('env can not be created by provider.');
    }
    /**
     * @brief      base implementation of source writing
     *
     * @param      data  The data
     *
     * @return     {true} if written successfully; {false} otherwise
     */
    write(data) {
        return rxjs_1.Observable.throw('env can not be written by provider.');
    }
    /**
     * @brief      checks if source does exist
     *
     * @return
     */
    exists() {
        return rxjs_1.Observable.of(true);
    }
}
exports.EnvProvider = EnvProvider;
//# sourceMappingURL=provider.class.js.map
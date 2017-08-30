"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packageVersion = require('../package.json').version;
function log(format, ...args) {
    if ('string' !== typeof format) {
        return log('', format, ...args);
    }
    if (process.env.NODE_ENV === 'debug') {
        console.log('\x1b[2m%s\x1b[0m' + format, `[kio-ng2-env v${packageVersion}]`, ...args);
    }
}
exports.log = log;
//# sourceMappingURL=debug.js.map
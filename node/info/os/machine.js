"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const machine = {
    release: os.release(),
    type: os.type(),
    username: os.userInfo().username,
    arch: os.arch(),
    host: os.hostname()
};
exports.default = machine;
//# sourceMappingURL=machine.js.map
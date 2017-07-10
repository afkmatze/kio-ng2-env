"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxfs_1 = require("rxfs");
exports.branches = () => {
    return rxfs_1.exec('git branch -v').map((row, idx) => `${row}`);
};
//# sourceMappingURL=git.js.map
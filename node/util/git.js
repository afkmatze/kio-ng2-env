"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxfs_1 = require("rxfs");
exports.branches = () => {
    return rxfs_1.exec('git branch -v').map((row, idx) => row.stdout.toString('utf8'));
};
//# sourceMappingURL=git.js.map
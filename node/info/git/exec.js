"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxfs_1 = require("rxfs");
const execGit = (commandArgs) => {
    return rxfs_1.exec(`git ${commandArgs}`).map(row => row.stdout.toString('utf8'));
};
const parseBranch = (branchString) => {
    const [_, flag, name, hash, message] = branchString.match(/(^\*)?\ *(\w+)\ *(\w+)\ (.+)/);
    return {
        current: flag === '*',
        name,
        hash,
        message
    };
};
exports.branches = () => execGit('branch -v').map(parseBranch);
const parseCommitShort = (commitString) => {
    const [_, hash, message] = commitString.match(/^\*\ (\w+)\ (.+)/);
    return {
        hash,
        message
    };
};
exports.commits = () => execGit('log --graph --oneline --all').map(parseCommitShort);
//# sourceMappingURL=exec.js.map
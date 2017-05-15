"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxfs_1 = require("rxfs");
const common_1 = require("../../../common");
const execGit = (commandArgs, cwd) => {
    return rxfs_1.exec(`git ${commandArgs}`, { cwd }).map(row => row.stdout.toString('utf8'));
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
const parseRemote = (remoteString) => {
    const [_, name, url, typeName] = remoteString.match(/(\w+)\ *(.+)\ (\(\w+\))/);
    return {
        name,
        url,
        type: common_1.RemoteType[typeName]
    };
};
exports.remotes = (cwd) => {
    return execGit('remote -v', cwd).map(parseRemote)
        .map(remote => ({
        name: remote.name,
        url: remote.url
    }))
        .distinct(remote => remote.name);
};
exports.branches = (cwd) => execGit('branch -v', cwd).map(parseBranch);
const parseCommitShort = (commitString) => {
    const result = commitString.match(/^[\*|\|\ ]{0,}(\w+)\ (.+)/);
    if (result) {
        const [_ = undefined, hash = undefined, message = undefined] = result;
        return {
            hash,
            message
        };
    }
    return {
        hash: undefined,
        message: undefined
    };
};
exports.commits = (cwd, branchName = '--all') => execGit(`log --oneline ${branchName}`, cwd).map(parseCommitShort);
//# sourceMappingURL=exec.js.map
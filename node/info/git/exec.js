"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxshell_1 = require("rxshell");
const common_1 = require("../../../common");
function isStreamData(other) {
    return ('object' === typeof other) && (other['stdout']);
}
const execGit = (commandArgs, cwd) => {
    return rxshell_1.exec(`git ${commandArgs}`)
        .map((data) => data instanceof Buffer ? data.toString('utf8') : data);
};
const parseBranch = (branchString) => {
    if (isStreamData(branchString)) {
        return parseBranch(branchString['stdout']);
    }
    if (branchString instanceof Buffer) {
        return parseBranch(branchString.toString('utf8'));
    }
    if ('string' !== typeof branchString) {
        console.log(branchString);
        throw Error(`branch string must be a string value. got ${typeof branchString} - ${branchString.constructor}`);
    }
    const [_, flag, name, commit, message] = branchString.match(/(^\*)?\ *(\w+)\ *(\w+)\ (.+)/);
    return {
        current: flag === '*',
        name,
        commit,
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
    return execGit('remote -v', cwd).map(result => {
        return parseRemote(result);
    })
        .map(remote => ({
        name: remote.name,
        url: remote.url
    }))
        .distinct(remote => remote.name);
};
exports.branches = (cwd) => execGit('branch -v', cwd).map(parseBranch);
const parseCommitShort = (commitString) => {
    if ('string' !== typeof commitString) {
        console.log(commitString);
        throw Error(`Invalid argument of type ${typeof commitString}. Expected string but got ${commitString}`);
    }
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
exports.commits = (cwd, branchName = '--all') => execGit(`log --oneline ${branchName}`, cwd).filter(v => !!v).map(parseCommitShort);
//# sourceMappingURL=exec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const exec_1 = require("./exec");
class GitRepository {
    constructor(filepath, remotes, branches) {
        if (branches !== undefined) {
            this._branches = branches.slice();
        }
        if (remotes !== undefined) {
            this._remotes = remotes.slice();
        }
        this._filepath = filepath;
    }
    get filepath() {
        return this._filepath;
    }
    get remotes() {
        return this._remotes.slice();
    }
    get branches() {
        return this._branches.slice();
    }
    readRemotes() {
        if (this._remotes) {
            return rxjs_1.Observable.from(this._remotes);
        }
        return exec_1.remotes(this.filepath);
    }
    readBranches() {
        if (this._branches) {
            return rxjs_1.Observable.from(this._branches);
        }
        return exec_1.branches(this.filepath);
    }
    readCommits(branch) {
        if ('object' === typeof branch) {
            return exec_1.commits(this.filepath, branch.name);
        }
        return exec_1.commits(this.filepath, branch);
    }
}
exports.GitRepository = GitRepository;
//# sourceMappingURL=repository.class.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const git_1 = require("../../util/git");
exports.command = (store) => {
    const info = {
        buildCount: store.get('buildCount') || 0,
        buildBranch: store.get('buildBranch'),
        buildMachine: os.arch() + ' ' + os.hostname(),
        buildTime: new Date()
    };
    return git_1.branches().filter(b => b.indexOf('*') === 0).take(1)
        .toPromise()
        .then(branch => {
        //console.log('branchList',branch)
        info.buildBranch = branch;
        info.buildCount++;
        store.set(info);
        //console.log('set store', info)
        return store.save();
    });
};
//# sourceMappingURL=prebuild.js.map
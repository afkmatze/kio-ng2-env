"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommitShort = (other) => {
    return ('hash' in other
        &&
            'message' in other);
};
exports.isCommit = (other) => {
    return ('author' in other
        &&
            exports.isCommitShort(other));
};
exports.isBranch = (other) => {
    return ('name' in other
        &&
            'current' in other
        &&
            exports.isCommitShort(other));
};
exports.isRemoteAbstract = (other) => {
    return ('name' in other
        &&
            'url' in other);
};
exports.isRemoteInfo = (other) => {
    return ('type' in other
        &&
            exports.isRemoteAbstract(other));
};
exports.isRemote = (other) => {
    return ('branches' in other && Array.isArray(other.branches)
        &&
            exports.isRemoteAbstract(other));
};
exports.isRepository = (other) => {
    return ('branches' in other && Array.isArray(other.branches)
        &&
            'remotes' in other && Array.isArray(other.remotes));
};
exports.isRepositoryLocation = (other) => {
    return ('filepath' in other
        &&
            exports.isRepository(other));
};
//# sourceMappingURL=git.type-checks.js.map
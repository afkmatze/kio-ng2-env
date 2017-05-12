"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_type_1 = require("./repository.type");
exports.isRepository = (repository) => {
    return (repository
        && repository_type_1.isRepositoryType(repository.type)
        && 'url' in repository);
};
exports.isGitRepository = (repository) => {
    return (exports.isRepository(repository)
        && repository_type_1.isGIT(repository.type));
};
//# sourceMappingURL=interfaces.js.map
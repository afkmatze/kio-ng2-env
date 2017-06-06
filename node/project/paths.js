"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const path = require("path");
exports.projectPath = (project) => {
    const pathInProject = (pathType) => {
        if (typeof pathType === 'string') {
            return pathInProject(common_1.ProjectPath[pathType]);
        }
        if (pathType === common_1.ProjectPath.rootDirectory) {
            return path.resolve(project.rootModule.filepath);
        }
        if (pathType === common_1.ProjectPath.envFile) {
            return (process.env.KIO_NG2_PROJECT
                ||
                    path.join(project.rootModule.filepath, project.rootModule.name + '.json'));
        }
    };
    return pathInProject;
};
//# sourceMappingURL=paths.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const location_type_checks_1 = require("../location/location.type-checks");
exports.isProjectInfo = (info) => {
    return ('name' in info);
};
exports.isProjectRootLocation = (location) => {
    return ('local' in location && location_type_checks_1.isLocation(location.local)
        &&
            'remote' in location && location_type_checks_1.isLocation(location.remote));
};
//# sourceMappingURL=project.type-checks.js.map
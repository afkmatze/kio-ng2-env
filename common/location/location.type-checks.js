"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLocation = (location) => {
    return ('name' in location
        &&
            'type' in location);
};
exports.isFileLocation = (location) => {
    return ('filepath' in location
        &&
            'string' === typeof location.filepath);
};
exports.isLocalLocation = (location) => {
    return (exports.isFileLocation(location)
        &&
            exports.isLocation(location));
};
//# sourceMappingURL=location.type-checks.js.map
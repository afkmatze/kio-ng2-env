"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.fromPath = (filepath) => {
    const pckg = require(path.join(filepath, 'package.json'));
    console.log('info about "%s"', pckg.name, pckg.version);
    return {
        name: pckg.name,
        version: pckg.version,
        repository: pckg.repository
    };
};
//# sourceMappingURL=module.js.map
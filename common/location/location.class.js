"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnvLocation {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }
    toString() {
        return `${this.type} location "${this.name}"`;
    }
}
exports.EnvLocation = EnvLocation;
//# sourceMappingURL=location.class.js.map
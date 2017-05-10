"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const common_1 = require("../../common");
const ROOT_DIR = path.resolve('./');
class NodeEnvProvider extends common_1.EnvProvider {
    resolveEnvFile() {
        return common_1.ENV_FILEPATH;
    }
    readEnvFile() {
        const envFilepath = this.resolveEnvFile();
        return new Promise((resolve, reject) => {
            fs.readFile(envFilepath, 'utf8', (error, content) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(content);
                }
            });
        });
    }
    toJSON(data) {
        return JSON.stringify(data, null, '  ');
    }
    writeEnvFile(data) {
        const envFilepath = this.resolveEnvFile();
        return new Promise((resolve, reject) => {
            fs.writeFile(envFilepath, this.toJSON(data), 'utf8', (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    read() {
        return this.readEnvFile()
            .then(fileContent => JSON.parse(fileContent));
    }
    write(data) {
        return this.writeEnvFile(data);
    }
}
exports.NodeEnvProvider = NodeEnvProvider;
//# sourceMappingURL=provider.class.js.map
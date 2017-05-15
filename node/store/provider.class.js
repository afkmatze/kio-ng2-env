"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rxfs = require("rxfs");
const rxjs_1 = require("rxjs");
const path = require("path");
const common_1 = require("../../common");
const ROOT_DIR = path.resolve('./').replace(/\/node_modules\/.*/, '');
class NodeEnvProvider extends common_1.EnvProvider {
    resolveEnvFile() {
        return this.filepath || common_1.ENV_FILEPATH;
    }
    readEnvFile() {
        const envFilepath = this.resolveEnvFile();
        return rxjs_1.Observable.fromPromise(new Promise((resolve, reject) => {
            fs.readFile(envFilepath, 'utf8', (error, content) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(content);
                }
            });
        }));
    }
    toJSON(data) {
        return JSON.stringify(data, null, '  ');
    }
    writeEnvFile(data) {
        const envFilepath = this.resolveEnvFile();
        return rxjs_1.Observable.fromPromise(new Promise((resolve, reject) => {
            fs.writeFile(envFilepath, this.toJSON(data), 'utf8', (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        }));
    }
    read() {
        return this.readEnvFile()
            .map(fileContent => {
            return JSON.parse(fileContent);
        })
            .map(project => {
            const { components = [] } = project;
            project.components = components.map(component => {
                if (!component.modifiers) {
                    component.modifiers = [];
                }
                return component;
            });
            return project;
        });
    }
    create(defaultData) {
        if (!defaultData) {
            return this.create({});
        }
        if (defaultData instanceof rxjs_1.Observable) {
            return defaultData.flatMap(data => {
                return this.create(data);
            });
        }
        else if (defaultData instanceof Promise) {
            return this.create(rxjs_1.Observable.fromPromise(defaultData));
        }
        const data = JSON.stringify(defaultData, null, '  ');
        console.log('write data \n\x1b[2m%s\x1b[0m', data);
        return rxfs.writeFile(this.resolveEnvFile(), rxjs_1.Observable.of(new Buffer(data)));
    }
    write(data) {
        return this.writeEnvFile(data);
    }
    exists() {
        return rxfs.exists(this.resolveEnvFile());
    }
}
exports.NodeEnvProvider = NodeEnvProvider;
//# sourceMappingURL=provider.class.js.map
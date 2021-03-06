"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rxfs = require("rxfs");
const rxjs_1 = require("rxjs");
const path = require("path");
const project_1 = require("../project");
const common_1 = require("../../common");
const ROOT_DIR = path.resolve('./').replace(/\/node_modules\/.*/, '');
class NodeEnvProvider extends common_1.EnvProvider {
    resolveEnvFile() {
        //console.log('KIO_NG2_PROJECT', process.env.KIO_NG2_PROJECT)
        //console.log('process.cwd()', process.cwd())
        return project_1.projectConfigFile(process.env.KIO_NG2_PROJECT || process.cwd());
    }
    readEnvFile() {
        const envFilepath = this.resolveEnvFile();
        return rxfs.exists(envFilepath).flatMap(exists => {
            if (exists)
                return require(envFilepath);
            return rxjs_1.Observable.throw(Error(`File does not exist at "${envFilepath}".`));
        });
    }
    toJSON(data) {
        return JSON.stringify(data, null, '  ');
    }
    writeEnvFile(data, filepath = this.resolveEnvFile()) {
        return rxjs_1.Observable.fromPromise(new Promise((resolve, reject) => {
            fs.writeFile(filepath, this.toJSON(data), 'utf8', (error) => {
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
            .catch(error => {
            return rxjs_1.Observable.throw(`Could not load env file at "${this.resolveEnvFile()}". ${error}`);
        })
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
        return rxfs.writeFile(this.resolveEnvFile(), rxjs_1.Observable.of(new Buffer(data)));
    }
    write(data) {
        return this.writeEnvFile(data).flatMap(success => {
            /*if ( this.resolveEnvFile() !== ENV_FILEPATH )
            {
              return this.writeEnvFile(data,ENV_FILEPATH)
            }*/
            return rxjs_1.Observable.of(success);
        });
    }
    exists() {
        return rxfs.exists(this.resolveEnvFile());
    }
}
exports.NodeEnvProvider = NodeEnvProvider;
//# sourceMappingURL=provider.class.js.map
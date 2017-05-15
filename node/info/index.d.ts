import { Observable } from 'rxjs/Observable';
import { Machine, ModuleInfo } from '../../common';
export * from '../../common';
import * as git from './git';
import * as os from './os';
import * as modules from './modules';
export { git, modules, os };
export declare const update: (cwd: string, data?: any) => Observable<{
    buildCount: any;
    buildTime: Date;
    buildMachine: Machine;
    buildBranch: string;
    modules: ModuleInfo[];
}>;

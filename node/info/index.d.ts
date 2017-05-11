import { Observable } from 'rxjs/Observable';
import { Machine } from '../../common';
import * as git from './git';
import * as os from './os';
import * as modules from './modules';
export { git, os, modules };
export declare const update: (data?: any) => Observable<{
    buildCount: any;
    buildTime: Date;
    buildMachine: Machine;
    buildBranch: string;
    modules: string[];
}>;

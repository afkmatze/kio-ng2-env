import { Observable } from 'rxjs';
import { NodeEnvProvider } from './store/provider.class';
import { Machine } from '../common';
import { git, os, modules } from './info';
export declare let globalStore: any;
export declare const createProvider: <T>() => NodeEnvProvider<T>;
export declare const createStore: <T>() => any;
export declare const api: {
    git: typeof git;
    os: typeof os;
    modules: typeof modules;
    update: (data?: any) => Observable<{
        buildCount: any;
        buildTime: Date;
        buildMachine: Machine;
        buildBranch: string;
        modules: string[];
    }>;
};

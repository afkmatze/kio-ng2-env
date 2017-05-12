import { Observable } from 'rxjs';
import { NodeEnvProvider } from './store/provider.class';
import { Project } from '../common';
import { git, os, modules } from './info';
export declare let globalStore: any;
export declare const createProvider: <T>() => NodeEnvProvider<T>;
export declare const createStore: <T>() => any;
export declare const api: {
    git: typeof git;
    os: typeof os;
    modules: typeof modules;
    updateProject: <T extends string>(info?: Project<T>) => Observable<Project<T>>;
};

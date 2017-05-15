import { Observable } from 'rxjs';
import { NodeEnvProvider } from './store/provider.class';
import { EnvStore, Project } from '../common';
export * from '../common';
export * from './project';
import { git, os, modules } from './info';
export declare let globalStore: any;
export declare const createProvider: <T>(filepath?: string) => NodeEnvProvider<T>;
export declare const createStore: <T>(defaultData?: T | Observable<T>) => EnvStore<T>;
export declare const api: {
    git: typeof git;
    os: typeof os;
    modules: typeof modules;
};
export declare const env: (projectPath?: string) => Observable<EnvStore<Project>>;

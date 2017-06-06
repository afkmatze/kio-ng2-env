/**
 * kio-ng2-env for node
 * @module kio-ng2-env/node
 */
import { Observable } from 'rxjs';
import { NodeEnvProvider } from './store/provider.node.class';
import { EnvStore, Project } from '../common';
export * from '../common';
export * from './project';
import { git, os, modules } from './info';
export declare let globalStore: any;
export declare const createProvider: (filepath: string) => NodeEnvProvider<Project>;
export declare const createStore: (projectData?: Project) => EnvStore<Project>;
export declare const api: {
    git: typeof git;
    os: typeof os;
    modules: typeof modules;
};
export declare const env: (projectPath?: string) => Observable<EnvStore<Project>>;
export default env;

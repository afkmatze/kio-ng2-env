/// <reference types="node" />
import { Observable } from 'rxjs';
export * from './module';
import { ModuleInfo } from '../../../common';
/**
 * resolves root path of kio-ng2-env
 * @type {[type]}
 */
export declare const moduleRootPath: () => string;
/**
 * resolves main project root path
 * @type {[type]}
 */
export declare const rootPath: () => string;
export declare const rootModule: (defaultPath?: string) => ModuleInfo;
export declare const printModuleTree: (mod?: any, depth?: number) => void;
export declare const modulePathFrom: (mod: NodeModule, rootModule?: NodeModule, path?: NodeModule[]) => NodeModule[];
export declare const nodeRootModule: (mod?: NodeModule) => any;
export declare const modulePaths: () => Observable<string>;
export declare const kioModulesAtPath: (modulesPath: string) => any;
export declare const kioModules: () => Observable<ModuleInfo>;

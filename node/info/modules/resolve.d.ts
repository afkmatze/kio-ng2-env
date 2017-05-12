import { Observable } from 'rxjs';
import { ModuleInfo } from '../../../common';
export declare const pathBefore: (dirname: string) => string;
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
export declare const rootModule: <T extends string>() => ModuleInfo<T>;
export declare const modulePaths: () => Observable<string>;
export declare const kioModulesAtPath: (modulesPath: string) => Observable<ModuleInfo<string>>;
export declare const kioModules: () => Observable<ModuleInfo<string>>;

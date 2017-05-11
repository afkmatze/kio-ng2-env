import { Observable } from 'rxjs';
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
export declare const kioModules: () => Observable<string>;

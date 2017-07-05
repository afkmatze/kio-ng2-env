import { Observable } from 'rxjs';
import { EnvProvider } from './provider.class';
export declare type PartialData<T> = {
    [P in keyof T]?: T[P];
};
export declare const isKeyOf: <T>(key: string, other: T) => key is keyof T;
export interface EnvData {
    [key: string]: any;
}
export declare const merge: <T, K extends keyof T>(data: T, other: Partial<T>) => T;
export declare class EnvStore<T extends EnvData> {
    private env;
    protected defaultData: T | Observable<T>;
    constructor(env: EnvProvider<T>, defaultData?: T | Observable<T>);
    private _data;
    protected data: T;
    getDefaultData(): Observable<T>;
    ensureExistance(): Observable<boolean>;
    protected mergeDefault(): Observable<this>;
    load(): Observable<this>;
    save(): Observable<boolean>;
    get<P extends keyof T>(key: P): T[P];
    hasKey(key: any): key is keyof T;
    set(key: PartialData<T>): any;
    set(key: keyof T, value: any): any;
}

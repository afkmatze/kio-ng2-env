import { EnvProvider } from './provider.class';
export declare type PartialData<T> = {
    [P in keyof T]?: T[P];
};
export declare class EnvStore<T, P extends EnvProvider<T>> {
    private env;
    constructor(env: P);
    protected data: T;
    ensureExistance(): Promise<boolean>;
    load(): Promise<this>;
    save(): Promise<boolean>;
    get<P extends keyof T>(key: P): T[P];
    hasKey(key: any): key is keyof T;
    set(key: PartialData<T>): any;
    set(key: keyof T, value: any): any;
}

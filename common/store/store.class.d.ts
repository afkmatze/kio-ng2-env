import { EnvProvider } from './provider.class';
export declare class EnvStore<T, P extends EnvProvider<T>> {
    private env;
    constructor(env: P);
    protected data: T;
    load(): Promise<this>;
    save(): Promise<boolean>;
}

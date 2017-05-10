import { EnvProvider } from '../../common';
export declare class BrowserEnvProvider<T> extends EnvProvider<T> {
    read(): Promise<T>;
}

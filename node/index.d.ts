import { NodeEnvProvider } from './store/provider.class';
export declare let globalStore: any;
export declare const createProvider: <T>() => NodeEnvProvider<T>;
export declare const createStore: <T>() => any;
export declare const api: {
    prebuild: () => Promise<boolean>;
};

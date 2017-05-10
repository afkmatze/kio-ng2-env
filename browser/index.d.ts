import { BrowserEnvProvider } from './store/provider.class';
import { EnvStore } from '../common';
export * from './store/provider.class';
export declare const createProvider: <T>() => BrowserEnvProvider<T>;
export declare const createStore: <T>() => EnvStore<{}, BrowserEnvProvider<T>>;

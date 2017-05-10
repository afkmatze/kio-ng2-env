import { BrowserEnvProvider } from './store/provider.class';
import { EnvStore } from '../common';
export declare const createProvider: <T>() => BrowserEnvProvider<T>;
export declare const createStore: <T>() => EnvStore<{}, BrowserEnvProvider<T>>;

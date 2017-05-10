import { NodeEnvProvider } from './store/provider.class';
import { EnvStore } from '../common';
export declare const createProvider: <T>() => NodeEnvProvider<T>;
export declare const createStore: <T>() => EnvStore<{}, NodeEnvProvider<T>>;

import { BrowserEnvProvider } from './store/provider.class';
import { EnvStore, Project } from '../common';
export * from './store/provider.class';
export declare const createProvider: <T>() => BrowserEnvProvider<T>;
export declare const createStore: <T>() => EnvStore<T>;
declare var _default: EnvStore<Project>;
export default _default;

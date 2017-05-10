import { BrowserEnvProvider } from './store/provider.class'
import { EnvStore } from '../common'
export * from './store/provider.class'

export const createProvider = <T>():BrowserEnvProvider<T> => new BrowserEnvProvider<T>()

export const createStore = <T>() => new EnvStore(createProvider<T>())
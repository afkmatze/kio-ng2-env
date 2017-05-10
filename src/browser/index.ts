import { BrowserEnvProvider } from './store/provider.class'
import { EnvStore } from '../common'


export const createProvider = <T>():BrowserEnvProvider<T> => new BrowserEnvProvider<T>()

export const createStore = <T>() => new EnvStore(createProvider<T>())
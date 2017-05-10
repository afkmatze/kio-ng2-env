import { NodeEnvProvider } from './store/provider.class'
import { EnvStore } from '../common'


export const createProvider = <T>():NodeEnvProvider<T> => new NodeEnvProvider<T>()

export const createStore = <T>() => new EnvStore(createProvider<T>())
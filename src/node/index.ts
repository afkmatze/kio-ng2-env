import { NodeEnvProvider } from './store/provider.class'
import { EnvStore } from '../common'

import { command as prebuildCmd } from './store/commands/prebuild'

export let globalStore

export const createProvider = <T>():NodeEnvProvider<T> => new NodeEnvProvider<T>()
export const createStore = <T>() => {
  globalStore = globalStore || new EnvStore(createProvider())
  return globalStore
}


export const api = {
  prebuild: () => prebuildCmd (globalStore)
}
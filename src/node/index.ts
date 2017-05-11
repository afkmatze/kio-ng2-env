import { Observable } from 'rxjs'
import { NodeEnvProvider } from './store/provider.class'
import { EnvStore, Machine, Branch, Repository, CommitShort, Commit } from '../common'

import { git, os, modules, update } from './info'

export let globalStore

export const createProvider = <T>():NodeEnvProvider<T> => new NodeEnvProvider<T>()
export const createStore = <T>() => {
  globalStore = globalStore || new EnvStore(createProvider())
  return globalStore
}


export const api = {
  git, os, modules, update
}
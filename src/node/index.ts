import { Observable } from 'rxjs'
import * as path from 'path'
import { NodeEnvProvider } from './store/provider.class'
import { 
  EnvStore, Machine, Branch, 
  Repository, CommitShort, Commit,
  Project, ProjectInfo, 
  BuildInfo,
  RepositoryInfo,
  DefaultData,
  isProject ,
  ModuleInfo 
} from '../common'
export * from '../common'

//import { updateProject } from './actions/updateInfo'

export * from './project'
import { project } from './project'

import { git, os, modules, update } from './info'

export let globalStore

export const createProvider = <T>(filepath?:string):NodeEnvProvider<T> => new NodeEnvProvider<T>(filepath)
export const createStore = <T>(defaultData?:T|Observable<T>):EnvStore<T> => {
  const filepath = path.join(modules.resolve.rootPath(),modules.resolve.rootModule().name+'.json')
  return new EnvStore<T>(createProvider(filepath),defaultData)
}


export const api = {
  git, os, modules //, updateProject
}

export const env = ( projectPath:string=modules.resolve.rootPath() ):Observable<EnvStore<Project>> => {

  return project(projectPath).map(createStore)
        .flatMap ( store => {
          return store.load()
        } )
        .flatMap ( store => {
          return store.save().mapTo(store)
        } )
}
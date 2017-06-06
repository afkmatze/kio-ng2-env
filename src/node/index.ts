/**
 * kio-ng2-env for node
 * @module kio-ng2-env/node
 */
import { Observable } from 'rxjs'
import * as path from 'path'
import { NodeEnvProvider } from './store/provider.node.class'
import { 
  EnvStore, Machine, Branch, 
  Repository, CommitShort, Commit,
  Project, ProjectInfo, ProjectPath,
  BuildInfo,
  RepositoryInfo,
  DefaultData,
  isProject ,
  ModuleInfo 
} from '../common'
export * from '../common'

//import { updateProject } from './actions/updateInfo'

export * from './project'
import { project, projectPath } from './project'

import { git, os, modules, update } from './info'

export let globalStore

export const createProvider = (filepath:string):NodeEnvProvider<Project> => new NodeEnvProvider(filepath)

//export const createStore = (defaultData?:Project|Observable<Project>):EnvStore<Project> => {
export const createStore = (projectData?:Project):EnvStore<Project> => {
  const filepath = projectPath(projectData)(ProjectPath.envFile)
  const provider = createProvider(filepath)
  return new EnvStore<Project>(provider,projectData)
}


export const api = {
  git, os, modules //, updateProject
}

export const env = ( projectPath:string=modules.resolve.rootPath() ):Observable<EnvStore<Project>> => {

  return project(projectPath)
        .flatMap ( projectData => {
          console.log('create env with project data', projectData )
          return createStore(projectData).load()
        } )
}


export default env
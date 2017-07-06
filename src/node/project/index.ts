import { Observable } from 'rxjs'
import * as path from 'path'
import { 
  Machine, ModuleInfo, 
  isProjectInfo, 
  Project, ProjectInfo, EnvStore, EnvProvider,
  RepositoryInfo, BuildInfo,
  RootModuleInfo,
  Branch, CommitShort, Commit,
  KioFolders
} from '../../common'

import { modules, os, git } from '../info'

export const getRepositoryInfo = (cwd:string):Observable<RepositoryInfo> => {
  return git.branches(cwd).map ( b => {
    return b
  } )
    .filter(branch => branch.current===true)
    .flatMap( branch => {
      return git.commits(cwd).toArray().map ( commits => {
        return {
          branch,
          commit: commits.find(commit => commit.hash === branch.commit )
        }

      } )
    })
}

export const getBuildInfo = (cwd:string):Observable<BuildInfo> => {
  return getRepositoryInfo(cwd).map ( buildRepository => {
    const info = {
      buildCount: 0,
      buildTime: new Date(),
      buildMachine: os.machine,
      buildRepository
    }
    return info
  } )
}


export const projectConfigFile = ( projectPath:string ) => {
  const rootModule = modules.resolve.fromPath ( projectPath )
  const configFilename = rootModule.name + '.json'
  return path.join(projectPath,configFilename)
}

export const project = ( projectPath:string ):Observable<Project> => {
  const rootModule = modules.resolve.fromPath(projectPath)

  if ( !('kio' in (<any>rootModule)) )
  {
    return Observable.throw(`Please set kio folder configuration in "${projectPath}/package.json".`)
  }

  return getBuildInfo(projectPath).flatMap ( lastBuild => {

    return modules.resolve.kioModules().toArray().map ( kioModules => {
      return {
        name: rootModule.name,
        rootModule: {
          ...rootModule,
          children: kioModules.filter ( mod => mod.name !== rootModule.name )
        } ,
        lastBuild,
        folders: (<any>rootModule).kio,
        components: []
      }
    } )
  } )
}
import { Observable } from 'rxjs'
import { modules, os, git } from '../info'
import { 
  ModuleInfo, Repository, 
  RepositoryType, GIT ,
  isGitRepository ,
  Branch, Commit, CommitShort,
  Project
} from '../../common'


export const updateRepositoryInfo = <T extends RepositoryType>( repository:Repository<T> ):Observable<string> => {
  if ( isGitRepository(repository) )
  {
    return git.branches().filter(b => b.current).map ( branch => `${branch.name} ${branch.hash} ${branch.message}` )
  }
  return Observable.empty()
}

export const updateProject = <T extends RepositoryType>( info?:Project<T> ):Observable<Project<T>> => {

  const currentInfo:ModuleInfo<T> = modules.resolve.rootModule<T>()

  const {
    buildCount=0,
    buildBranch=undefined,
    buildMachine=undefined,
    buildTime=new Date(),
    root=modules.resolve.rootPath(),
    rootModule=currentInfo
  } = info || {}

  const nextInfo = {
    buildCount,
    buildBranch,
    buildMachine,
    buildTime,
    root,
    rootModule    
  }

  const mergeRepoInfo = updateRepositoryInfo<T>(nextInfo.rootModule.repository)
  return mergeRepoInfo.map ( buildBranch => ({
    ...nextInfo ,
    buildCount: buildCount+1,
    buildBranch
  }) )
}
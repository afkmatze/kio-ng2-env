import { 
  Branch, isBranch, 
  Commit, isCommit, 
  CommitShort, isCommitShort, 
  RootModuleInfo, ModuleInfo,
  Remote,  isRemote
} from '../info'
import { 
  ProjectInfo, Project, BuildInfo
} from './interfaces'

//import { RootModuleInfo, ModuleInfo } from '../../common'
import { NamedComponent, isNamedComponent } from 'kio-ng2'


export const isModuleInfo = ( other:any ):other is ModuleInfo => {
  return (
      'name' in other
      &&
      'version' in other
      &&
      'filepath' in other      
    )
}

export const isRootModuleInfo = ( other:any ):other is RootModuleInfo => {
  return (
      'children' in other && other.children.every(isModuleInfo) 
      &&
      isModuleInfo(other)
    )
}

export const isBuildInfo = ( other:any ):other is BuildInfo => {
  return (
    'buildCount' in other && 'number' === typeof other.buildCount
     && 'buildTime' in other && other.buildTime instanceof Date
     && 'buildMachine' in other 
     && 'buildRepository' in other
  )
}

export const isProjectInfo = ( info:any ):info is ProjectInfo => {
  return (
      'name' in info
    )
}

export const isProjectProp = ( key:string ): key is keyof Project => {
  return (
      key === 'rootModule'
      ||
      key === 'lastBuild'
      ||
      key === 'components'
      ||
      key === 'name'
    )
}

export const isProject = ( info:any ):info is Project => {
  return (
      'rootModule' in info && isRootModuleInfo(info.rootModule)
      &&
      'lastBuild' in info && isBuildInfo(info.lastBuild)
      &&
      'components' in info && Array.isArray(info.components) && info.components.every(isNamedComponent)
      &&
      isProjectInfo(info)
    )
}
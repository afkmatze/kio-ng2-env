import { isLocation } from '../location/location.type-checks'

import { 
  Branch, isBranch, 
  Commit, isCommit, 
  CommitShort, isCommitShort,   
  Remote,  isRemote
} from '../info'
import { 
  ProjectRootLocation, ProjectInfo, Project, BuildInfo
} from './interfaces'

import { RootModuleInfo, ModuleInfo } from '../../common'
import { NamedComponent, isNamedComponent } from 'kio-ng2-component-routing'


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

export const isProjectRootLocation = ( location:any ):location is ProjectRootLocation => {
  return (
      'local' in location && isLocation(location.local)
      &&
      'remote' in location && isLocation(location.remote)
    )
}
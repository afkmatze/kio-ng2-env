import { NamedComponent } from 'kio-ng2-data'

import { 
  Machine, ModuleInfo, RepositoryType, RootModuleInfo,
  Branch, CommitShort
} from '../info'

import { Nested } from './types'

export interface ProjectInfo {
  name: string  
}

export interface RepositoryInfo {
  branch: Branch
  commit: CommitShort
}

export interface BuildInfo {
  buildCount: number
  buildTime: Date
  buildMachine: Machine
  buildRepository: RepositoryInfo
}

export interface KioFolders {
  root: string
  components: {
    structure: string
    navigation: string
    publication: string
  }
}


export interface Project extends ProjectInfo 
{
  rootModule: RootModuleInfo
  lastBuild:BuildInfo
  components?:NamedComponent[]
}
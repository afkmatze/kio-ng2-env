import { 
  ModuleInfo, 
  RepositoryType, Repository, 
  GIT, isRepositoryType, isGIT
} from '../../../common'

import * as path from 'path'
import { readFile } from 'rxfs'


export const pathBefore = ( dirname:string, source:string=__dirname ):string => {
  const pathChunks = source.split( dirname )
  return path.normalize ( pathChunks[0] + '/' ).slice(0,-1)
}


export const fromPath = ( filepath:string ):ModuleInfo => {
  const moduleDir = path.join(filepath)
  const pckg = require(path.resolve(moduleDir,'package.json'))
  return {
    name: pckg.name,
    filepath: moduleDir,
    version: pckg.version,
    repository: pckg.repository,
    kio: pckg.kio
  }
}
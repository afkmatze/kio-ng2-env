import { 
  ModuleInfo, 
  RepositoryType, Repository, 
  GIT, isRepositoryType, isGIT, isGitRepository, isRepository
} from '../../../common'

import * as path from 'path'
import { readFile } from 'rxfs'

export const fromPath = <T extends RepositoryType>( filepath:string ):ModuleInfo<T> => {
  const pckg = require(path.join(filepath,'package.json'))
  console.log('info about "%s"', pckg.name, pckg.version)
  return {
    name: pckg.name,
    version: pckg.version,
    repository: pckg.repository
  }
}
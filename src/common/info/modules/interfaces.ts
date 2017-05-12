import { RepositoryType, GIT, isRepositoryType, isGIT } from './repository.type'


export interface Repository <T extends RepositoryType> {
  type:T
  url: string
}

export interface ModuleInfo <T extends RepositoryType> {

  name:string

  version:string

  repository:Repository<T>

}


export const isRepository = <T extends RepositoryType>( repository:any ):repository is Repository<T> => {
  return (
      repository 
      && isRepositoryType(repository.type)
      && 'url' in repository
    )
}

export const isGitRepository = ( repository:any ):repository is Repository<GIT> => {
  return (
      isRepository<GIT>(repository)
      && isGIT(repository.type)
    )
}



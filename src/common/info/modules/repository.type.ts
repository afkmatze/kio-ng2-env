export type GIT = 'git'

export type RepositoryType = string|GIT


export const isRepositoryType = ( repositoryType:string ):repositoryType is RepositoryType => {
  return repositoryType === 'git'
}

export const isGIT = ( repositoryType:string ): repositoryType is GIT => {
  return repositoryType === 'git'
}
import { RepositoryType } from './repository.type'


export interface Repository <T extends RepositoryType> {
  type:T
  url: string
}

export interface ModuleInfo <T extends RepositoryType, R extends Repository<T>> {

  name:string

  version:string

  repository:R

}
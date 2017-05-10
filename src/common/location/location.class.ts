import { Location, DirectoryLocation } from './interfaces'
import { LocationType } from './location.type'

export abstract class EnvLocation <T extends LocationType> implements Location<T> {
  
  constructor(
    readonly type:T,
    readonly name:string
  ){}


  toString(){
    return `${this.type} location "${this.name}"`
  }

}
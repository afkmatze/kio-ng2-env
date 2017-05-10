import { LocationType, RemoteLocation, LocalLocation, WebLocation } from './location.type'

export interface Location<T extends LocationType> {
  readonly type:T
  readonly name: string
}

export interface FileLocation {
  filepath:string
}

export interface Local extends Location<LocalLocation> {
  
}

export interface DirectoryLocation<S extends LocationType, T extends LocationType, U extends LocationType> {
  [key:string]: Location<S|T|U>
} 

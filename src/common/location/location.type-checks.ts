import { Location, FileLocation, Local, DirectoryLocation } from './interfaces'
import * as Types from './location.type'

export const isLocation = <T extends Types.LocationType> ( location:any ): location is Location<T> => {
  return (
    'name' in location
    &&
    'type' in location
  )
}

export const isFileLocation = ( location:any ): location is FileLocation => {
  return (
    'filepath' in location
    &&
    'string' === typeof location.filepath
  )
}


export const isLocalLocation = ( location:any ): location is Local => {
  return (
      isFileLocation ( location )
      &&
      isLocation <Types.LocalLocation> ( location )
    )
}
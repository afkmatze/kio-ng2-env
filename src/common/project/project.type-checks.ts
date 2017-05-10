import { ProjectRootLocation, ProjectInfo, Project } from './interfaces'
import { isLocation } from '../location/location.type-checks'

export const isProjectInfo = ( info:any ):info is ProjectInfo => {
  return (
      'name' in info
    )
}

export const isProjectRootLocation = ( location:any ):location is ProjectRootLocation => {
  return (
      'local' in location && isLocation(location.local)
      &&
      'remote' in location && isLocation(location.remote)
    )
}
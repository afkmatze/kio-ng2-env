import { ProjectPath, Project } from '../../common'
import * as path from 'path'

export const projectPath = ( project:Project ) => {
  const pathInProject = ( pathType:ProjectPath|string ):string => {
    if ( typeof pathType === 'string' )
    {
      return pathInProject(ProjectPath[pathType])
    }

    if ( pathType === ProjectPath.rootDirectory )
    {
      return path.resolve(project.rootModule.filepath)
    }
    
    if ( pathType === ProjectPath.envFile )
    {
      return (
          process.env.KIO_NG2_PROJECT 
          ||
          path.join(project.rootModule.filepath,project.rootModule.name+'.json')
        )
    }
  }

  return pathInProject
}
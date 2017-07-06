import { Observable } from 'rxjs'
import * as path from 'path'
import { existsSync, writeFile } from 'rxfs'

import { 
  Project,
  ModuleInfo 
} from '../common'
import { project } from './project'

import { modules } from './info'



export const initEnvironment = ( projectPath:string ) => {

  return project(projectPath).map ( projectData => {
    
    const projectModule:ModuleInfo = modules.resolve.fromPath(projectPath)
    const projectName = projectModule.name

    const projectEnvFile = path.join(projectPath,`${projectName}.json`)
    if ( existsSync(projectEnvFile) )
    {
      const projectEnv = require(projectEnvFile)
      return Observable.of({
        ...projectData,
        ...projectEnv
      })
    }
    else {
      const contentSource = JSON.stringify(projectData,null,'  ').split('\n').map ( row => new Buffer(row) )
      return writeFile(projectEnvFile, Observable.from(contentSource), 'utf8' ).map ( success => {
        return projectData
      } )
    }


  } )

}
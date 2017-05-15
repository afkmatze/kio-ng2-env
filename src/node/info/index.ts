import { Observable } from 'rxjs/Observable'
import { 
  Machine, ModuleInfo, 
  Repository, RepositoryType, isRepositoryType, isGIT,
  isProjectInfo, isProjectRootLocation, 
  ProjectRootLocation, Project, ProjectInfo, EnvStore, EnvProvider
} from '../../common'
export * from '../../common'
import * as git from './git'
import * as os from './os'
import * as modules from './modules'

export { git , modules , os }

export const update = ( cwd:string, data?:any ) => {

  return git.branches(cwd)
        .filter ( branch => branch.current === true )
        .concatMap ( branch => {

          return modules.resolve.kioModules().toArray().map ( kioModules => {
            return {
              buildCount: ((data && data.buildCount) || 0 ) + 1,
              buildTime: new Date(),
              buildMachine: os.machine,
              buildBranch: branch.name ,
              modules: kioModules,
            }
          } )

        } )

}
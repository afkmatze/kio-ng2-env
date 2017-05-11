import { Observable } from 'rxjs/Observable'
import { Machine } from '../../common'
import * as git from './git'
import * as os from './os'
import * as modules from './modules'


export { git, os, modules }


export const update = ( data?:any ) => {

  return git.branches()
        .filter ( branch => branch.current === true )
        .concatMap ( branch => {

          return modules.resolve.kioModules().toArray().map ( modules => {
            return {
              buildCount: ((data && data.buildCount) || 0 ) + 1,
              buildTime: new Date(),
              buildMachine: os.machine,
              buildBranch: branch.name ,
              modules,
            }
          } )

        } )

}
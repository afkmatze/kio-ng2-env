import { Observable } from 'rxjs'
import { exists, readdir } from 'rxfs'
import { find } from 'rxshell'
import * as path from 'path'
import { fromPath } from './module'
import { ModuleInfo, Repository, RepositoryType, GIT } from '../../../common'

const logMap = ( label ) => ( item , idx ) => {
  console.log( '%s no %s\n', label, idx, item )
  return item
}

export const pathBefore = ( dirname:string ):string => {
  const pathChunks = __dirname.split( dirname )
  return path.normalize ( pathChunks[0] ).slice(0,-1)
}

/**
 * resolves root path of kio-ng2-env
 * @type {[type]}
 */
export const moduleRootPath = ( ):string => {
  return path.join(pathBefore('kio-ng2-env'),'kio-ng2-env')
}

/**
 * resolves main project root path
 * @type {[type]}
 */
export const rootPath = ( ):string => {
  if ( !module.parent )
  {
    throw Error('kio-ng2-env is not installed to a parent module.')
  }
  return pathBefore ( 'node_modules' )
}

export const rootModule = <T extends RepositoryType>():ModuleInfo<T> => {
  const filepath = rootPath()
  return fromPath<T>(filepath)
}

export const modulePaths = ( ) => {
  const parentModulePaths:string[] = module.parent["paths"]
  return Observable.from(parentModulePaths)
      .flatMap ( filepath => exists(filepath).map ( pathExists => ({
        filepath ,
        pathExists
      }) ) )
      .filter ( p => p.pathExists === true ).map ( p => p.filepath )
      
}

export const kioModulesAtPath = ( modulesPath:string ) => {
  return find(['.','-maxdepth','1'],modulesPath).map ( s => s.stdout.toString('utf8').substr(2) )
        .filter ( filepath => /^kio\-ng2/.test(path.basename(filepath)) ).distinct()
        .map ( fromPath )
}

export const kioModules = ( ) => {
  return modulePaths()
    //.map ( logMap('existing path') )
    .mergeMap ( 
      modulesPath => kioModulesAtPath ( modulesPath )
    )
}
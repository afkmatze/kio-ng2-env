import { Observable } from 'rxjs'
import { exists, readdir } from 'rxfs'
import * as path from 'path'

const logMap = ( label ) => ( item , idx ) => {
  console.log( '%s no %s\n', label, idx, item )
  return item
}

export const pathBefore = ( dirname:string ):string => {
  const pathChunks = __dirname.split( dirname )
  return path.normalize ( pathChunks[0] )
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


export const kioModules = ( ) => {
  const parentModulePaths:string[] = module.parent["paths"]
  return Observable.from(parentModulePaths)
    .flatMap ( filepath => exists(filepath).map ( pathExists => ({
      filepath ,
      pathExists
    }) ) )
    .filter ( ({filepath,pathExists}) => pathExists === true ).map ( ({filepath}) => filepath )
    //.map ( logMap('filepath') )
    .concatMap ( 
      modulesPath => readdir(modulesPath).filter ( filepath => /^kio\-ng2/.test(filepath) )
    )
}
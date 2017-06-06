import { Observable } from 'rxjs'
import { exists, readdir } from 'rxfs'
import { find } from 'rxshell'
import * as path from 'path'
import { fromPath, pathBefore } from './module'
export * from './module'
import { ModuleInfo, Repository, RepositoryType, GIT } from '../../../common'

const logMap = ( label ) => ( item , idx ) => {
  console.log( '%s no %s\n', label, idx, item )
  return item
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
  if ( 'KIO_NG2_PROJECT' in process.env )
  {
    return process.env.KIO_NG2_PROJECT
  }
  if ( !module.parent )
  {
    throw Error('kio-ng2-env is not installed to a parent module.')
  }
  return pathBefore ( 'node_modules', moduleRootPath() )
}

export const rootModule = ( defaultPath?:string ):ModuleInfo => {
  const filepath = defaultPath || rootPath()
  console.log('rootModule()',filepath)
  return fromPath(filepath)
}

export const printModuleTree = ( mod=nodeRootModule(), depth=0 ) => {
  console.log('|%s %s','-'.repeat(depth),path.basename(mod.filename))
  mod.children.forEach ( child => printModuleTree(child,depth+1) )  
}

export const modulePathFrom = ( mod:NodeModule, rootModule:NodeModule=nodeRootModule(), path:NodeModule[]=[] ):NodeModule[] => {
  path = [ mod , ...path ]
  
  if ( mod === rootModule )
  {
    return path  
  }  
  if ( mod.parent )
  {
    return modulePathFrom ( mod.parent, rootModule, path )
  }
  return path
}

export const nodeRootModule = ( mod=module ) => {
  if ( mod.parent )
    return nodeRootModule(mod.parent)
  return mod
}

export const modulePaths = ( ) => {
  const rootModulePath = rootPath()
  const parentModulePaths:string[] = [path.join(rootModulePath,'node_modules')]
  return Observable.from(parentModulePaths)
      .flatMap ( filepath => exists(filepath).map ( pathExists => ({
        filepath ,
        pathExists
      }) ) )
      .filter ( p => p.pathExists === true ).map ( p => p.filepath )
      
}

export const kioModulesAtPath = ( modulesPath:string ) => {
  return find(['.','-maxdepth','1'],modulesPath).map ( s => s.stdout.toString('utf8').substr(2) )
        //.map ( logMap('modules') )
        .filter ( filepath => /^kio\-ng2/.test(path.basename(filepath)) ).distinct()
        .map ( dirname => path.join(modulesPath,dirname) )
        .map ( fromPath )
}

export const kioModules = ( ):Observable<ModuleInfo> => {
  return modulePaths()
    //.map ( logMap('existing path') )
    .mergeMap ( 
      modulesPath => kioModulesAtPath ( modulesPath )
    )
}
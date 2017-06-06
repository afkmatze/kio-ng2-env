import * as fs from 'fs'
import * as rxfs from 'rxfs'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/switch'

import * as path from 'path'
import { EnvProvider, DefaultData, Project } from '../../common'
import { DriverInstance, DriverType, DriverTypes } from './driver'

const encodeJSON = ( data:any ):string => JSON.stringify ( data, null, '  ')

const encodeData = ( data:any ):Buffer => {
  return new Buffer(encodeJSON(data))
}

const readOrCreateFile = ( filepath:string, defaultData:Buffer ):Observable<Buffer> => {
  return rxfs.exists(filepath)
    .flatMap ( doesExist => 
      doesExist 
      ? rxfs.readFile<Buffer>(filepath,'utf8') 
      : rxfs.writeFile(filepath, Observable.of(defaultData), 'utf8')
          .toArray()
          .flatMap( result => rxfs.readFile<Buffer>(filepath,'utf8') )
    )
    .map ( jsonData => jsonData )
}

const readOrCreateJSON = <T>( filepath:string, defaultData:T ):Observable<T> => {
  return readOrCreateFile(filepath, encodeData(defaultData))
    .map ( data => JSON.parse ( data.toString('utf8') ) )
}
/*
export class NodeEnvProvider extends EnvProvider<Project> {

  constructor(readonly filepath?:string,protected storeDriver:DriverInstance<DriverType>){
    super()
  }

  protected resolveEnvFile ():string {
    console.log('this.filepath',this.filepath)
    return this.filepath
  }

  protected readEnvFile ():Observable<Project> {
    const envFilepath = this.resolveEnvFile ()
    //return this.storeDriver.reader.read()
  }

  protected toJSON (data:Project) {
    return JSON.stringify(data,null,'  ')
  } 

  protected writeEnvFile ( data:Project ):Observable<boolean> {
    const envFilepath = this.resolveEnvFile ()
    return Observable.fromPromise(new Promise((resolve,reject)=>{
      fs.writeFile ( envFilepath, this.toJSON(data), 'utf8', ( error ) => {
        if ( error )
        {
          reject ( error )
        }
        else {
          resolve ( true )
        }
      } )
    }))
  }

  read ():Observable<Project> {
    return this.readEnvFile()
      .map ( project => {
        const {
          components=[]
        } = project

        project.components = components.map ( component => {
          if ( !component.modifiers )
          {
            component.modifiers = []
          }
          return component
        } )

        return project
      } )
  }

  create ( defaultData?:DefaultData<Project> ):Observable<boolean> {
    if ( !defaultData )
    {
      throw Error('No default data!')
    }
    if ( defaultData instanceof Observable )
    {
      return defaultData.flatMap ( data => {
        return this.create(data)
      } )
    }
    else if ( defaultData instanceof Promise )
    {
      return this.create(Observable.fromPromise(defaultData))
    }
    const data = JSON.stringify(defaultData,null,'  ')
    console.log('write data \n\x1b[2m%s\x1b[0m',data)
    return rxfs.writeFile(this.resolveEnvFile(),Observable.of(new Buffer(data)))
  }

  write ( data:Project ):Observable<boolean> {
    return this.writeEnvFile (data)
  }

  exists(){
    return rxfs.exists(this.resolveEnvFile())
  }
}*/
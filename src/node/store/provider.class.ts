import * as fs from 'fs'
import * as rxfs from 'rxfs'
import { Observable } from 'rxjs'

import * as path from 'path'
import { EnvProvider, ENV_FILEPATH, DefaultData } from '../../common'

const ROOT_DIR = path.resolve('./').replace ( /\/node_modules\/.*/, '' )

export class NodeEnvProvider<T> extends EnvProvider<T> {

  protected resolveEnvFile ():string {
    return this.filepath || ENV_FILEPATH
  }

  protected readEnvFile ():Observable<string> {
    const envFilepath = this.resolveEnvFile ()
    return Observable.fromPromise(new Promise((resolve,reject)=>{
      fs.readFile ( envFilepath, 'utf8', ( error, content ) => {
        if ( error )
        {
          reject ( error )
        }
        else {
          resolve ( content )
        }
      } )
    }))
  }

  protected toJSON (data:T) {
    return JSON.stringify(data,null,'  ')
  } 

  protected writeEnvFile ( data:T, filepath:string=this.resolveEnvFile () ):Observable<boolean> {
    return Observable.fromPromise(new Promise((resolve,reject)=>{
      fs.writeFile ( filepath, this.toJSON(data), 'utf8', ( error ) => {
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

  read ():Observable<T> {
    return this.readEnvFile()
      .map ( fileContent => {
        return JSON.parse ( fileContent )
      } )
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

  create <T>( defaultData?:DefaultData<T> ):Observable<boolean> {
    if ( !defaultData )
    {
      return this.create({})
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
    //console.log('write data \n\x1b[2m%s\x1b[0m',data)
    return rxfs.writeFile(this.resolveEnvFile(),Observable.of(new Buffer(data)))
  }

  write ( data:T ):Observable<boolean> {
    return this.writeEnvFile (data).flatMap ( success => {
      if ( this.resolveEnvFile() !== ENV_FILEPATH )
      {
        return this.writeEnvFile(data,ENV_FILEPATH)
      }
      return Observable.of(success)
    } )
  }

  exists(){
    return rxfs.exists(this.resolveEnvFile())
  }
}
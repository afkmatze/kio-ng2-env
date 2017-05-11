import * as fs from 'fs'
import * as rxfs from 'rxfs'
import { Observable } from 'rxjs'

import * as path from 'path'
import { EnvProvider, ENV_FILEPATH } from '../../common'

const ROOT_DIR = path.resolve('./').replace ( /\/node_modules\/.*/, '' )

export class NodeEnvProvider<T> extends EnvProvider<T> {

  protected resolveEnvFile ():string {
    return ENV_FILEPATH
  }

  protected readEnvFile ():Promise<string> {
    const envFilepath = this.resolveEnvFile ()
    return new Promise((resolve,reject)=>{
      fs.readFile ( envFilepath, 'utf8', ( error, content ) => {
        if ( error )
        {
          reject ( error )
        }
        else {
          resolve ( content )
        }
      } )
    })
  }

  protected toJSON (data:T) {
    return JSON.stringify(data,null,'  ')
  } 

  protected writeEnvFile ( data:T ):Promise<boolean> {
    const envFilepath = this.resolveEnvFile ()
    return new Promise((resolve,reject)=>{
      fs.writeFile ( envFilepath, this.toJSON(data), 'utf8', ( error ) => {
        if ( error )
        {
          reject ( error )
        }
        else {
          resolve ( true )
        }
      } )
    })
  }

  read ():Promise<T> {
    return this.readEnvFile()
          .then ( fileContent => JSON.parse ( fileContent ) )
  }

  create ( ):Promise<boolean> {
    return rxfs.writeFile(this.resolveEnvFile(),Observable.of(new Buffer('{}')),'utf8').toPromise()
  }

  write ( data:T ):Promise<boolean> {
    return this.writeEnvFile (data)
  }

  exists(){
    return rxfs.exists(this.resolveEnvFile()).toPromise()
  }
}
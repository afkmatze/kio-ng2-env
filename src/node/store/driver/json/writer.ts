import { Observable } from 'rxjs'
import { FileWriter } from '../writer.file'
import { readFile, writeFile } from 'fs'

const read = ( filepath:string ):Promise<string> => {
  return new Promise ( (resolve, reject) => {
    readFile (filepath, 'utf8', ( error, content ) => {
      if ( error ) { reject ( error ) }
      else { resolve (content) }
    })
  } )
}

const write = ( filepath:string, content:string ):Promise<boolean> => {
  return new Promise ( (resolve, reject) => {
    writeFile (filepath, 'utf8', ( error, content ) => {
      if ( error ) { reject ( error ) }
      else { resolve (content) }
    })
  } )
}

const readJSON = <T>( filepath:string ):Promise<T> => read(filepath).then ( JSON.parse )

export class JSONWriter<T> extends FileWriter<T> {

  encodeData ( data:T ):string {
    return JSON.stringify(data, null, '  ')
  }

}
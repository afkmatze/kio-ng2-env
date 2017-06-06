import { EnvWriter } from './writer'
import { Observable } from 'rxjs'
import { writeFile } from 'fs'

const write = ( filepath:string, content:string ):Promise<boolean> => {
  return new Promise ( (resolve, reject) => {
    writeFile (filepath, content, 'utf8', ( error ) => {
      if ( error ) { reject ( error ) }
      else { resolve() }
    })
  } )
}

export abstract class FileWriter<T> extends EnvWriter<T> {

  constructor(protected filepath:string){
    super()
  }

  protected writeFile ( data:T|string, filepath:string=this.filepath ):Observable<boolean> {
    if ( !data )
    {
      return Observable.throw(Error('Invalid content'))
    }
    const fileContent = this.encodeData(data)
    return Observable.fromPromise(write(filepath,fileContent)).map ( () => true )
  }

  write ( data:T|string ):Observable<boolean> {
    if ( 'string' === typeof data )
    {
      return this.writeFile ( data, this.filepath )
    }
    return this.write ( this.encodeData(data) )
  }

}
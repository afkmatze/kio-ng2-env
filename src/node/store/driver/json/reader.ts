import { Observable } from 'rxjs'
import { EnvReader } from '../reader'
import { readFile } from 'rxfs'

export class JSONReader<T> extends EnvReader<T> {

  constructor(protected filepath:string){
    super()
  }

  decodeData ( data:string ) {
    return JSON.parse(data)
  }

  read ():Observable<T> {
    return readFile<Buffer> (
        this.filepath, 
        'utf8'
      )
      .toArray()
      .map ( rows => rows.map ( row => row.toString('utf8') ).join('\n') )
      .map ( jsonData => JSON.parse(jsonData) )
  }

}
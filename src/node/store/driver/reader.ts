import { Observable } from 'rxjs'

export abstract class EnvReader<T> {

  constructor(){}

  decodeData ( source:Buffer|string ):T {
    if ( source instanceof Buffer )
    {
      return this.decodeData(source.toString('utf8'))
    }
    return JSON.parse(source)
  }

  abstract read():Observable<T>
}
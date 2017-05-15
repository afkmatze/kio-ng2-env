import { Observable } from 'rxjs'

export type DefaultData<T> = T|Observable<T>|Promise<T>

export abstract class EnvProvider<T> {

  constructor(readonly filepath?:string){}

  abstract read ():Observable<T> 

  resolve<T>( data:DefaultData<T> ):Observable<T> {
    if ( data instanceof Observable )
    {
      return data.share()
    }
    if ( data instanceof Promise )
    {
      return Observable.fromPromise(data)
    }
    return Observable.of(data)
  }

  create ( defaultData?:DefaultData<T> ):Observable<boolean> {
    return Observable.throw ('env can not be written by provider.')
  }

  write ( data:T ):Observable<boolean> {
    return Observable.throw ('env can not be written by provider.')
  }

  exists():Observable<boolean>{
    return Observable.of(true)
  }

}
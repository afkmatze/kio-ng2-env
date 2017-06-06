import { Observable } from 'rxjs'

export type DefaultData<T> = T|Observable<T>|Promise<T>

/**
 * @brief      environment data provider
 * @description abstract class for cross platform implementation
 */
export abstract class EnvProvider<T> {

  constructor(){}

  /**
   * @brief      read data from source; called by EnvStore
   *
   * @return     Observable of target data
   */
  abstract read ():Observable<T> 


  resolve( data:DefaultData<T> ):Observable<T> {
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

  /**
   * @brief      base implementation of source creation
   *
   * @param      defaultData  default data for initialization
   *
   * @return     {true} if created successfully; {false} otherwise
   */
  create ( defaultData?:DefaultData<T> ):Observable<boolean> {
    return Observable.throw ('env can not be created by provider.')
  }

  /**
   * @brief      base implementation of source writing
   *
   * @param      data  The data
   *
   * @return     {true} if written successfully; {false} otherwise
   */
  write ( data:T ):Observable<boolean> {
    return Observable.throw ('env can not be written by provider.')
  }

  /**
   * @brief      checks if source does exist
   *
   * @return     
   */
  exists():Observable<boolean>{
    return Observable.of(true)
  }

}
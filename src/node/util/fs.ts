import { Observable } from 'rxjs'
import * as fs from 'fs'

const prom = <T>( callable:Function ) => ( ...args:any[] ):Promise<T> => new Promise ( (resolve,reject) => {
  callable ( ...args, ( error , payload? ) => {
    error ? reject ( error ) : resolve ( payload )
  } )
} )

const obs = <T>( callable:Function ) => ( ...args:any[] ):Observable<T> => Observable.fromPromise(prom(callable)(...args))

export function readFile ( filepath:string ):Observable<Buffer>
export function readFile ( filepath:string, encoding:string ):Observable<string> 
export function readFile ( filepath:string, encoding?:string ):Observable<string>|Observable<Buffer> 
{
  if ( encoding )
  {
    return obs<string>(fs.readFile)(filepath,encoding)
  }
  return obs<Buffer>(fs.readFile)(filepath)
}
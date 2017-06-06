import { Observable } from 'rxjs'

interface ToString {
  ():string
}

interface ToEncodedString {
  (encoding:string):string
}

const isToEncodedStringMethod = ( method:Function ):method is ToEncodedString => {
  return (
      method.length > 0
      &&
      method.name === 'toString'
    )
}

const isToStringMethod = ( method:Function ):method is ToString => {
  return (
      method.length === 0
      &&
      method.name === 'toString'
    )
}

export abstract class EnvWriter<T> {

  constructor(){}

  public abstract write( data:T|string ):Observable<boolean>

  public encodeData <T>( data:T|string ):string {
    if ( 'string' === typeof data )
    {
      return data
    }
    if ( 'function' === typeof data.toString )
    {
      const toStringMethod:ToString|ToEncodedString = data.toString
      if ( isToStringMethod(toStringMethod) )
      {
        return toStringMethod()
      }
      else
      {
        return toStringMethod('utf8')
      }
    }
    return JSON.stringify(data,null,'  ')
  }

}
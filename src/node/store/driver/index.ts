import { JSONReader, JSONWriter } from './json'
import { EnvWriter } from './writer'
import { EnvReader } from './reader'
import { Observable } from 'rxjs'

export { EnvWriter, EnvReader}

export type DriverType = 'json'|string
export type EnvDriver<T> = EnvReader<T>|EnvWriter<T>
export type DriverConstructor<T, D extends EnvDriver<T>> = {
  new (...args:any[]):D
}

export const isDriverConstructor = <T, D extends EnvDriver<T>> ( other:any ):other is DriverConstructor<T,D> => {
  return (
      'function' === typeof other
      &&
      /.*Reader$/.test(other.name)
      &&
      /.*Writer$/.test(other.name)
    )
}

export interface Driver<T> {
  type?:T
  Reader: DriverConstructor<T, EnvReader<T>>,
  Writer: DriverConstructor<T, EnvWriter<T>>
}

export const isDriver = <T>( other:any ):other is Driver<T> => {
  return (
    other &&
      (
        other["Reader"]
        &&
        isDriverConstructor(other.Reader)
      )
      &&
      (
        other["Writer"]
        &&
        isDriverConstructor(other.Writer)
      )
    )
}

export interface DriverTypeMap<T extends DriverType> {
  [key:string]: Driver<T>
}

export const DriverTypes = {
  'json': {
    Reader: JSONReader, 
    Writer: JSONWriter
  }
}

export const isDriverKey = ( key:any ):key is keyof DriverType => {
  return ( 
    'string' === typeof key
    &&
    key in DriverTypes
  )
}


export const createReader = <T, R extends EnvReader<T>>( driverType:DriverType, ...args:any[] ):R => {
  const Driver = <DriverConstructor<T,R>>DriverTypes[driverType].Reader
  return new Driver(...args)
}

export const createWriter = <T, R extends EnvWriter<T>>( driverType:DriverType, ...args:any[] ):R => {
  const Driver = <DriverConstructor<T,R>>DriverTypes[driverType].Writer
  return new Driver(...args)
}

export interface DriverInstance <T extends DriverType> {
  reader: EnvReader<T>
  writer: EnvWriter<T>
}

export const isDriverInterface = <T extends DriverType> ( other:any ):other is DriverInstance<T> => {
  return (
      (
        other['reader']
        &&
        other.reader instanceof EnvReader
      )
      &&
      (
        other['writer']
        &&
        other.writer instanceof EnvWriter
      )
    )
}
import { EnvWriter } from './writer'
import { EnvReader } from './reader'

export enum DriverTypes {
  json
}

export type EnvDriver<T extends DriverTypes> = EnvReader<T>|EnvWriter<T>

export interface IConstructor<B extends Object> {
  new (...args:any[]):B
}

/*export interface DriverConstructor<T extends DriverTypes, D extends EnvDriver<T>> {
  new (...args:any[]):D
}*/

export interface DriverConstructor<T extends DriverTypes> extends  IConstructor<T> {}



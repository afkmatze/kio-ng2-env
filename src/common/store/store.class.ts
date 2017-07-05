import { Observable } from 'rxjs'
import { EnvProvider, DefaultData } from './provider.class'
import * as rxfs from 'rxfs'
import { isProject } from '../project'


export type PartialData<T> = {
  [P in keyof T]?: T[P]
}

export const isKeyOf = <T>( key:string, other:T ):key is keyof T => {
  return key in other
}

export interface EnvData {
  [key:string]: any
}

export const merge = <T, K extends keyof T>( data:T, other:Partial<T> ):T => {
  const keys = Object.keys(data).concat(Object.keys(other))

  keys
  .filter( (key,idx) => keys.indexOf(key) === idx )
  .forEach ( key => {
    if ( isKeyOf(key,other) )
    {
      data[key] = other[key]
    }
  } )
  return data
}

export class EnvStore<T extends EnvData> {

  constructor(private env:EnvProvider<T>,protected defaultData?:T|Observable<T>)
  {}

  private _data:T

  protected get data():T {
    if ( !this._data )
      throw Error(`Tried to access data of empty store.`)
    return this._data
  }

  protected set data(value:T) {
    this._data = value
  }

  getDefaultData():Observable<T>{
    if ( this.defaultData instanceof Observable )
    {
      return this.defaultData.map ( defaultData => {
        this.defaultData = defaultData
        return defaultData
      } )
    }
    else {
      return Observable.of(this.defaultData)
    }
  }

  ensureExistance(){
    return this.env.exists()
      .flatMap ( doesExist => {
        if ( !doesExist )
        {
          console.log('env does not exist', this.defaultData)
          return this.env.create(this.getDefaultData())
        }
        return Observable.of(true)
      } )
  }

  protected mergeDefault () {
    return this.getDefaultData().map ( defaultData => {
      this.data = merge(defaultData,this.data)
      return this
    } )
  }

  load(){
    return this.ensureExistance()
      .flatMapTo ( this.env.read()
          .flatMap ( data => {
            this.data = data
            if ( !isProject(data) && this.defaultData )
            {
              return this.mergeDefault()
            }
            return Observable.of(this)
          } )
      )
  }

  save(){
    if ( !this.data )
    {
      throw Error('Cannot save before load')
    }
    return this.env.write(this.data)
  }

  get<P extends keyof T>(key:P):T[P]{
    return this.data[key]
  }


  hasKey(key:any):key is keyof T {
    return key in this.data
  }

  set(key:PartialData<T>)
  set(key:keyof T, value:any)
  set(key:keyof T|PartialData<T>, value?:any){
    if ( this.hasKey(key) )
    {
      this.data[key] = value  
    }
    else if ( value === undefined && 'object' === typeof key )
    {
      Object.keys(key).forEach( (vKey:keyof T) => {
        this.set(vKey,key[vKey])
      })
    }
    else {
      throw Error (`Invalid key "${key}".`)
    }
  }

}
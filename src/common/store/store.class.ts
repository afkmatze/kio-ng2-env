import { EnvProvider } from './provider.class'

export type PartialData<T> = {
  [P in keyof T]?: T[P]
}

export class EnvStore<T,P extends EnvProvider<T>> {

  constructor(private env:P){}

  protected data:T

  load(){
    return this.env.read().then ( data => {
      this.data = data
      return this
    } )
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
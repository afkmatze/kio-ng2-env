import { EnvProvider } from './provider.class'

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
    return this.env.write(this.data)
  }

}
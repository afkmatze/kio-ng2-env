import { BrowserEnvProvider } from './store/provider.class'
import { EnvStore, Project } from '../common'
import { Observable } from 'rxjs'
export * from './store/provider.class'

export const createProvider = <T>():BrowserEnvProvider<T> => new BrowserEnvProvider<T>()
export const createStore = <T>() => new EnvStore(createProvider<T>())

const syncObservable = <T>( obs:Observable<T> ):T => {
  let data
  let err
  obs.subscribe( result => {
    data = result
  }, error => {
    err = error
  } )
  while( !data && !err )
  {
    true
  }
  if ( err )
  {
    throw Error( err )    
  }
  return data
}

const defaultStore = createStore<Project>()

export default syncObservable(defaultStore.load())
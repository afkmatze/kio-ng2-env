export abstract class EnvProvider<T> {

  abstract read ():Promise<T> 

  create ( ):Promise<boolean> {
    return Promise.reject ('env can not be written by provider.')
  }

  write ( data:T ):Promise<boolean> {
    return Promise.reject ('env can not be written by provider.')
  }

  exists(){
    return Promise.resolve(true)
  }

}

export abstract class EnvProvider<T> {

  abstract read ():Promise<T> 

  write ( data:T ):Promise<boolean> {
    return Promise.reject ('env can not be written by provider.')
  }

}
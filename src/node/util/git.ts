import { Observable } from 'rxjs'
import { exec, ExecData } from 'rxfs'


export const branches = ( ):Observable<string> => {
  return exec('git branch -v').map ( (row,idx) => row.stdout )
}
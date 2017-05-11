import { Observable } from 'rxjs'
import { exec, ExecData } from 'rxfs'
import { Commit, CommitShort, Branch } from '../../../common'

const execGit = ( commandArgs:string ) => {
  return exec ( `git ${commandArgs}` ).map ( row => row.stdout.toString('utf8') )
}

const parseBranch = ( branchString:string ):Branch => {
  const [ _, flag, name, commit, message] = branchString.match ( /(^\*)?\ *(\w+)\ *(\w+)\ (.+)/ )
    return {
      current: flag === '*',
      name ,
      commit ,
      message
    }
}

export const branches = ( ):Observable<Branch> => execGit('branch -v').map ( parseBranch )

const parseCommitShort = ( commitString:string ):CommitShort => {
  const [ _, hash, message ] = commitString.match(/^\*\ (\w+)\ (.+)/)
  return {
    hash, 
    message
  }
}

export const commits = ():Observable<CommitShort> => execGit('log --graph --oneline --all').map ( parseCommitShort )
import { Observable } from 'rxjs'
import { exec, ExecData } from 'rxfs'
import { 
  Commit, CommitShort, Branch, 
  RemoteType,
  RemoteInfo, Remote, RemoteAbstract
} from '../../../common'

const execGit = ( commandArgs:string, cwd:string ) => {
  return exec (`git ${commandArgs}`,{cwd}).map ( row => row.stdout.toString('utf8') )
}

const parseBranch = ( branchString:string ):Branch => {
  const [ _, flag, name, hash, message] = branchString.match ( /(^\*)?\ *(\w+)\ *(\w+)\ (.+)/ )
    return {
      current: flag === '*',
      name ,
      hash ,
      message
    }
}

const parseRemote = <T extends RemoteType>( remoteString:string ):RemoteInfo<T> => {
  const [ _, name, url, typeName] = remoteString.match ( /(\w+)\ *(.+)\ (\(\w+\))/ )
    return {
      name, 
      url,
      type: RemoteType[typeName]
    }
}

export const remotes = ( cwd:string ):Observable<RemoteAbstract> => {
  return execGit ( 'remote -v', cwd ).map ( parseRemote )
    .map ( remote => ({
      name: remote.name,
      url: remote.url
    }) )
    .distinct ( remote => remote.name )
}

export const branches = ( cwd:string ):Observable<Branch> => execGit('branch -v', cwd).map ( parseBranch )

const parseCommitShort = ( commitString:string ):CommitShort => {
  const result = commitString.match(/^[\*|\|\ ]{0,}(\w+)\ (.+)/)
  if ( result )
  {
    const [ _=undefined, hash=undefined, message=undefined ] = result
    return {
      hash, 
      message
    }
  }
  return {
    hash: undefined,
    message: undefined
  }
}

export const commits = ( cwd:string, branchName:string='--all' ):Observable<CommitShort> => execGit(`log --oneline ${branchName}`,cwd).map ( parseCommitShort )
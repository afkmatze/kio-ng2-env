import { Observable } from 'rxjs'
import { exec } from 'rxshell'
import { 
  Commit, CommitShort, Branch, 
  RemoteType,
  RemoteInfo, Remote, RemoteAbstract
} from '../../../common'

const execGit = ( commandArgs:string, cwd:string ):Observable<string> => {
  return exec (`git ${commandArgs}`).map ( data => {
    return data.stdout
  } )
  .map ( (data:any) => data instanceof Buffer ? data.toString('utf8') : data )
}

const parseBranch = ( branchString:string ):Branch => {
  if ( 'string' !== typeof branchString )
  {
    console.log(branchString)
    throw Error(`branch string must be a string value. got ${typeof branchString}`)
  }
  const [ _, flag, name, commit, message] = branchString.match ( /(^\*)?\ *(\w+)\ *(\w+)\ (.+)/ )
    return {
      current: flag === '*',
      name ,
      commit ,
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
  return execGit ( 'remote -v', cwd ).map ( result => {
    return parseRemote(result)
  } )
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
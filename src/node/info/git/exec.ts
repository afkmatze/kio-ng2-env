import { Observable } from 'rxjs'
import { exec, StreamData } from 'rxshell'
import { 
  Commit, CommitShort, Branch, 
  RemoteType,
  RemoteInfo, Remote, RemoteAbstract
} from '../../../common'

function isStreamData <T extends string|Buffer> ( other:any ):other is StreamData<T> {
  return ( 'object' === typeof other ) && ( other['stdout'] )
}

const execGit = ( commandArgs:string, cwd:string ):Observable<string> => {
  return exec (`git ${commandArgs}`)
  .map ( (data:any) => data instanceof Buffer ? data.toString('utf8') : data )
}

const parseBranch = ( branchString:string|Buffer|StreamData<any> ):Branch => {
  if ( isStreamData ( branchString ) ) {
    return parseBranch(branchString['stdout'])
  }
  if ( branchString instanceof Buffer ) {
    return parseBranch ( branchString.toString('utf8') )
  }
  if ( 'string' !== typeof branchString )
  {
    console.log(branchString)
    throw Error(`branch string must be a string value. got ${typeof branchString} - ${branchString.constructor}`)
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
  if ( 'string' !== typeof commitString ) {
    console.log(commitString)
    throw Error(`Invalid argument of type ${typeof commitString}. Expected string but got ${commitString}`)
  }
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

export const commits = ( cwd:string, branchName:string='--all' ):Observable<CommitShort> => execGit(`log --oneline ${branchName}`,cwd).filter(v => !!v).map ( parseCommitShort )

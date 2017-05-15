import { Observable } from 'rxjs'
import { 
  RepositoryLocation, 
  RemoteInfo, RemoteType, RemoteAbstract, 
  Repository, Remote, Branch, Commit, CommitShort 
} from '../../../common'
import { branches, commits, remotes } from './exec'

export class GitRepository implements RepositoryLocation {

  constructor(filepath:string,remotes?:Remote[],branches?:Branch[])
  {
    if ( branches !== undefined )
    {
      this._branches = branches.slice()
    }
    if ( remotes !== undefined )
    {
      this._remotes = remotes.slice()
    }
    this._filepath = filepath
  }

  protected _filepath:string
  protected _remotes:RemoteAbstract[]
  protected _branches:Branch[]

  get filepath():string {
    return this._filepath
  }
  
  get remotes():RemoteAbstract[] {
    return this._remotes.slice()
  }
  
  get branches():Branch[] {
    return this._branches.slice()
  }

  readRemotes(){
    if ( this._remotes )
    {
      return Observable.from(this._remotes)
    }
    return remotes(this.filepath)
  }

  readBranches(){
    if ( this._branches )
    {
      return Observable.from(this._branches)
    }
    return branches(this.filepath)
  }

  readCommits(branch?:string|Branch){
    if ( 'object' === typeof branch )
    {
      return commits(this.filepath,branch.name)
    }
    return commits(this.filepath,branch)
  }

}
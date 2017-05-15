import { RemoteType } from './remote-type.enum'
import { CommitShort } from './interfaces'

export const isCommitShort = ( other:any ):other is CommitShort => {
  return (
      'hash' in other
      &&
      'message' in other
    )
}

import { Commit } from './interfaces'

export const isCommit = ( other:any ):other is Commit => {
  return (
      'author' in other
      && 
      isCommitShort(other)
    )
}

import { Branch } from './interfaces'

export const isBranch = ( other:any ):other is Branch => {
  return (
      'name' in other
      && 
      'current' in other
      && 
      isCommitShort(other)
    )
}

import { RemoteAbstract } from './interfaces'

export const isRemoteAbstract = ( other:any ):other is RemoteAbstract => {
  return (
      'name' in other
      && 
      'url' in other
    )
}

import { RemoteInfo } from './interfaces'

export const isRemoteInfo = <T extends RemoteType>( other:any ):other is RemoteInfo<T> => {
  return (
      'type' in other
      && 
      isRemoteAbstract(other)
    )
}

import { Remote } from './interfaces'

export const isRemote = ( other:any ):other is Remote => {
  return (
      'branches' in other && Array.isArray(other.branches)
      && 
      isRemoteAbstract(other)
    )
}

import { Repository } from './interfaces'

export const isRepository = ( other:any ):other is Repository => {
  return (
      'branches' in other && Array.isArray(other.branches)
      && 
      'remotes' in other && Array.isArray(other.remotes)
    )
}

import { RepositoryLocation } from './interfaces'

export const isRepositoryLocation = ( other:any ):other is RepositoryLocation => {
  return (
      'filepath' in other
      && 
      isRepository(other)
    )
}

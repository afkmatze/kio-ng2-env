
export interface CommitShort {
  hash:string
  message:string
}

export interface Commit extends CommitShort {
  author:string
}

export interface Branch extends CommitShort {
  name:string
  current:boolean
}
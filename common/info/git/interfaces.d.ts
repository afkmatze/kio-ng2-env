import { RemoteType } from './remote-type.enum';
export interface CommitShort {
    hash: string;
    message: string;
}
export interface Commit extends CommitShort {
    author: string;
}
export interface Branch {
    commit: string;
    message: string;
    name: string;
    current: boolean;
}
export interface RemoteAbstract {
    name: string;
    url: string;
}
export interface RemoteInfo<T extends RemoteType> extends RemoteAbstract {
    type: T;
}
export interface Remote extends RemoteAbstract {
    branches: Branch[];
}
export interface Repository {
    remotes: RemoteAbstract[];
    branches: Branch[];
}
export interface RepositoryLocation extends Repository {
    filepath: string;
}

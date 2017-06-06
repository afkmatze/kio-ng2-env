import { Observable } from 'rxjs';
import { RepositoryLocation, RemoteInfo, RemoteType, Remote, Branch, CommitShort } from '../../../common';
export declare class GitRepository implements RepositoryLocation {
    constructor(filepath: string, remotes?: Remote[], branches?: Branch[]);
    protected _filepath: string;
    protected _remotes: Remote[];
    protected _branches: Branch[];
    readonly filepath: string;
    readonly remotes: Remote[];
    readonly branches: Branch[];
    readRemotes(): Observable<Remote> | Observable<RemoteInfo<RemoteType>>;
    readBranches(): Observable<Branch>;
    readCommits(branch?: string | Branch): Observable<CommitShort>;
}

import { Observable } from 'rxjs';
import { RepositoryLocation, RemoteAbstract, Remote, Branch, CommitShort } from '../../../common';
export declare class GitRepository implements RepositoryLocation {
    constructor(filepath: string, remotes?: Remote[], branches?: Branch[]);
    protected _filepath: string;
    protected _remotes: RemoteAbstract[];
    protected _branches: Branch[];
    readonly filepath: string;
    readonly remotes: RemoteAbstract[];
    readonly branches: Branch[];
    readRemotes(): Observable<RemoteAbstract>;
    readBranches(): Observable<Branch>;
    readCommits(branch?: string | Branch): Observable<CommitShort>;
}

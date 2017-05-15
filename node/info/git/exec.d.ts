import { Observable } from 'rxjs';
import { CommitShort, Branch, RemoteAbstract } from '../../../common';
export declare const remotes: (cwd: string) => Observable<RemoteAbstract>;
export declare const branches: (cwd: string) => Observable<Branch>;
export declare const commits: (cwd: string, branchName?: string) => Observable<CommitShort>;

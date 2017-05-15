import { Observable } from 'rxjs';
import { CommitShort, Branch, RemoteType, RemoteInfo } from '../../../common';
export declare const remotes: <T extends RemoteType>(cwd: string) => Observable<RemoteInfo<T>>;
export declare const branches: (cwd: string) => Observable<Branch>;
export declare const commits: (cwd: string, branchName?: string) => Observable<CommitShort>;

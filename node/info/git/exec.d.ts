import { Observable } from 'rxjs';
import { CommitShort, Branch } from '../../../common';
export declare const branches: () => Observable<Branch>;
export declare const commits: () => Observable<CommitShort>;

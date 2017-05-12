import { Observable } from 'rxjs';
import { Repository, Project } from '../../common';
export declare const updateRepositoryInfo: <T extends string>(repository: Repository<T>) => Observable<string>;
export declare const updateProject: <T extends string>(info?: Project<T>) => Observable<Project<T>>;

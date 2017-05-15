import { Observable } from 'rxjs';
import { Project, RepositoryInfo, BuildInfo } from '../../common';
export declare const getRepositoryInfo: (cwd: string) => Observable<RepositoryInfo>;
export declare const getBuildInfo: (cwd: string) => Observable<BuildInfo>;
export declare const projectConfigFile: (projectPath: string) => string;
export declare const project: (projectPath: string) => Observable<Project>;

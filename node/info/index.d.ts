import { Observable } from 'rxjs/Observable';
import { Machine, ModuleInfo, Repository, RepositoryType, isRepositoryType, isGIT, isRepository, isGitRepository, isProjectInfo, isProjectRootLocation, ProjectRootLocation, Project, ProjectInfo, EnvStore, EnvProvider } from '../../common';
import * as git from './git';
import * as os from './os';
import * as modules from './modules';
export { git, os, modules, Machine, ModuleInfo, Repository, RepositoryType, isRepositoryType, isGIT, isRepository, isGitRepository, isProjectInfo, isProjectRootLocation, ProjectRootLocation, Project, ProjectInfo, EnvStore, EnvProvider };
export declare const update: (data?: any) => Observable<{
    buildCount: any;
    buildTime: Date;
    buildMachine: Machine;
    buildBranch: string;
    modules: ModuleInfo<string>[];
}>;

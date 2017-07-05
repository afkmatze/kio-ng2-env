import { NamedComponent } from 'kio-ng2';
import { Machine, RootModuleInfo, Branch, CommitShort } from '../info';
export interface ProjectInfo {
    name: string;
}
export interface RepositoryInfo {
    branch: Branch;
    commit: CommitShort;
}
export interface BuildInfo {
    buildCount: number;
    buildTime: Date;
    buildMachine: Machine;
    buildRepository: RepositoryInfo;
}
export interface Project extends ProjectInfo {
    rootModule: RootModuleInfo;
    lastBuild: BuildInfo;
    components?: NamedComponent[];
}

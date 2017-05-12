import { Location, Local, Types as LTypes } from '../location';
import { Machine, ModuleInfo, RepositoryType } from '../../common';
export interface ProjectInfo {
    name: string;
}
export interface BuildInfo {
    buildCount: number;
    buildTime: Date;
    buildMachine: Machine;
    buildBranch: string;
}
export interface ProjectRootLocation {
    local: Local;
    origin: Location<LTypes.RemoteLocation>;
}
export interface Project<T extends RepositoryType> extends ProjectInfo, BuildInfo {
    root: ProjectRootLocation;
    rootModule: ModuleInfo<T>;
}

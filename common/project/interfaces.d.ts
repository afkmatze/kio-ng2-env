import { Location, Local, Types as LTypes } from '../location';
export interface ProjectInfo {
    name: string;
}
export interface MachineInfo {
    release: string;
    type: string;
    username: string;
    arch: string;
    host: string;
}
export interface BuildInfo {
    buildCount: number;
    buildTime: Date;
    buildMachine: MachineInfo;
    buildBranch: string;
}
export interface ProjectRootLocation {
    local: Local;
    origin: Location<LTypes.RemoteLocation>;
}
export interface Project extends ProjectInfo, BuildInfo {
    root: ProjectRootLocation;
}

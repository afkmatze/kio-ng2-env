import { Location, Local, Types as LTypes } from '../location';
export interface ProjectInfo {
    name: string;
}
export interface BuildInfo {
    buildCount: number;
    buildTime: Date;
    buildMachine: string;
    buildBranch: string;
}
export interface ProjectRootLocation {
    local: Local;
    origin: Location<LTypes.RemoteLocation>;
}
export interface Project extends ProjectInfo, BuildInfo {
    root: ProjectRootLocation;
}

import { Location, Local, Types as LTypes } from '../location';
export interface ProjectInfo {
    name: string;
}
export interface ProjectRootLocation {
    local: Local;
    origin: Location<LTypes.RemoteLocation>;
}
export interface Project extends ProjectInfo {
    root: ProjectRootLocation;
}

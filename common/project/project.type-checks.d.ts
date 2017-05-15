import { ProjectRootLocation, ProjectInfo, Project, BuildInfo } from './interfaces';
import { RootModuleInfo, ModuleInfo } from '../../common';
export declare const isModuleInfo: (other: any) => other is ModuleInfo;
export declare const isRootModuleInfo: (other: any) => other is RootModuleInfo;
export declare const isBuildInfo: (other: any) => other is BuildInfo;
export declare const isProjectInfo: (info: any) => info is ProjectInfo;
export declare const isProject: (info: any) => info is Project;
export declare const isProjectRootLocation: (location: any) => location is ProjectRootLocation;

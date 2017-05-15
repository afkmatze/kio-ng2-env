import { RootModuleInfo, ModuleInfo } from '../info';
import { ProjectInfo, Project, BuildInfo } from './interfaces';
export declare const isModuleInfo: (other: any) => other is ModuleInfo;
export declare const isRootModuleInfo: (other: any) => other is RootModuleInfo;
export declare const isBuildInfo: (other: any) => other is BuildInfo;
export declare const isProjectInfo: (info: any) => info is ProjectInfo;
export declare const isProjectProp: (key: string) => key is "name" | "rootModule" | "lastBuild" | "components";
export declare const isProject: (info: any) => info is Project;

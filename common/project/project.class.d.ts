import { ProjectRootLocation, Project } from './interfaces';
export declare class ProjectEnv implements Project {
    readonly name: string;
    readonly root: ProjectRootLocation;
    constructor(name: string, root: ProjectRootLocation);
    buildCount: number;
    buildTime: Date;
    buildMachine: {
        release: string;
        type: string;
        username: string;
        arch: string;
        host: string;
    };
    buildBranch: string;
}

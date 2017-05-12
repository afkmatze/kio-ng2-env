import { RepositoryType } from './repository.type';
export interface Repository<T extends RepositoryType> {
    type: T;
    url: string;
}
export interface ModuleInfo<T extends RepositoryType> {
    name: string;
    version: string;
    repository: Repository<T>;
}
export declare const isRepository: <T extends string>(repository: any) => repository is Repository<T>;
export declare const isGitRepository: (repository: any) => repository is Repository<"git">;

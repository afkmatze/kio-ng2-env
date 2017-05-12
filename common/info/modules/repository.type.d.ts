export declare type GIT = 'git';
export declare type RepositoryType = string | GIT;
export declare const isRepositoryType: (repositoryType: string) => repositoryType is string;
export declare const isGIT: (repositoryType: string) => repositoryType is "git";

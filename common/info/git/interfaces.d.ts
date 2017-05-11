export interface CommitShort {
    hash: string;
    message: string;
}
export interface Commit extends CommitShort {
    author: string;
}
export interface Branch {
    name: string;
    current: boolean;
}

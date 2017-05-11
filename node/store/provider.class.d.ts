import { EnvProvider } from '../../common';
export declare class NodeEnvProvider<T> extends EnvProvider<T> {
    protected resolveEnvFile(): string;
    protected readEnvFile(): Promise<string>;
    protected toJSON(data: T): string;
    protected writeEnvFile(data: T): Promise<boolean>;
    read(): Promise<T>;
    create(): Promise<boolean>;
    write(data: T): Promise<boolean>;
    exists(): Promise<boolean>;
}

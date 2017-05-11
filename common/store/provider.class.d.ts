export declare abstract class EnvProvider<T> {
    abstract read(): Promise<T>;
    create(): Promise<boolean>;
    write(data: T): Promise<boolean>;
    exists(): Promise<boolean>;
}

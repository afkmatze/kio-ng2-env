export declare abstract class EnvProvider<T> {
    abstract read(): Promise<T>;
    write(data: T): Promise<boolean>;
}

import { Observable } from 'rxjs';
export declare type DefaultData<T> = T | Observable<T> | Promise<T>;
export declare abstract class EnvProvider<T> {
    readonly filepath: string;
    constructor(filepath?: string);
    abstract read(): Observable<T>;
    resolve<T>(data: DefaultData<T>): Observable<T>;
    create(defaultData?: DefaultData<T>): Observable<boolean>;
    write(data: T): Observable<boolean>;
    exists(): Observable<boolean>;
}

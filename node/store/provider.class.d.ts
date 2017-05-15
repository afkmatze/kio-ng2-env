import { Observable } from 'rxjs';
import { EnvProvider, DefaultData } from '../../common';
export declare class NodeEnvProvider<T> extends EnvProvider<T> {
    protected resolveEnvFile(): string;
    protected readEnvFile(): Observable<string>;
    protected toJSON(data: T): string;
    protected writeEnvFile(data: T): Observable<boolean>;
    read(): Observable<T>;
    create<T>(defaultData?: DefaultData<T>): Observable<boolean>;
    write(data: T): Observable<boolean>;
    exists(): Observable<boolean>;
}

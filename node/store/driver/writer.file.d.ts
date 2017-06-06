import { EnvWriter } from './writer';
import { Observable } from 'rxjs';
export declare abstract class FileWriter<T> extends EnvWriter<T> {
    protected filepath: string;
    constructor(filepath: string);
    protected writeFile(data: T | string, filepath?: string): Observable<boolean>;
    write(data: T | string): Observable<boolean>;
}

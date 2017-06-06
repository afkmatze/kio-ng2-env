import { Observable } from 'rxjs';
export declare abstract class EnvWriter<T> {
    constructor();
    abstract write(data: T | string): Observable<boolean>;
    encodeData<T>(data: T | string): string;
}

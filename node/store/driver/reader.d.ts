/// <reference types="node" />
import { Observable } from 'rxjs';
export declare abstract class EnvReader<T> {
    constructor();
    decodeData(source: Buffer | string): T;
    abstract read(): Observable<T>;
}

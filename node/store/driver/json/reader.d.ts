import { Observable } from 'rxjs';
import { EnvReader } from '../reader';
export declare class JSONReader<T> extends EnvReader<T> {
    protected filepath: string;
    constructor(filepath: string);
    decodeData(data: string): any;
    read(): Observable<T>;
}

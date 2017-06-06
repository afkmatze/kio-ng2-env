import { EnvProvider } from '../../common';
import { Observable } from 'rxjs';
import { Driver, DriverInstance, DriverType } from './driver';
export declare const castDriver: <T extends string>(driver: string | T | Driver<T> | DriverInstance<T>, ...args: any[]) => DriverInstance<T>;
export declare class NodeEnvProvider<T> extends EnvProvider<T> {
    constructor(driver: Driver<DriverType> | DriverInstance<DriverType> | DriverType | string);
    protected driver: DriverInstance<DriverType>;
    read(): Observable<T>;
    write(data: T | string): Observable<boolean>;
}

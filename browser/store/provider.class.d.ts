import { Observable } from 'rxjs';
import { EnvProvider } from '../../common';
export declare class BrowserEnvProvider<T> extends EnvProvider<T> {
    read(): Observable<T>;
}

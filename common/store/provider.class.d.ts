import { Observable } from 'rxjs';
export declare type DefaultData<T> = T | Observable<T> | Promise<T>;
/**
 * @brief      environment data provider
 * @description abstract class for cross platform implementation
 */
export declare abstract class EnvProvider<T> {
    constructor();
    /**
     * @brief      read data from source; called by EnvStore
     *
     * @return     Observable of target data
     */
    abstract read(): Observable<T>;
    resolve(data: DefaultData<T>): Observable<T>;
    /**
     * @brief      base implementation of source creation
     *
     * @param      defaultData  default data for initialization
     *
     * @return     {true} if created successfully; {false} otherwise
     */
    create(defaultData?: DefaultData<T>): Observable<boolean>;
    /**
     * @brief      base implementation of source writing
     *
     * @param      data  The data
     *
     * @return     {true} if written successfully; {false} otherwise
     */
    write(data: T): Observable<boolean>;
    /**
     * @brief      checks if source does exist
     *
     * @return
     */
    exists(): Observable<boolean>;
}

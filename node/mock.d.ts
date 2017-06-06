import { Observable } from 'rxjs';
export declare const encodeJSON: (data: any) => string;
export declare const decodeJSON: (data: string) => any;
export declare module file {
    const read: (filepath: string) => Observable<string>;
    const name: (fileType?: string, prefix?: string) => string;
}
/**
 * @brief      mock json file with default content
 *
 * @param      defaultContent  data to write in json format
 *
 * @return     filepath of temporary file
 */
export declare const mockJSONFile: (defaultContent: any) => Observable<string>;
export declare const toJSON: (value: any) => {
    [key: string]: any;
};
export declare const toJSONValue: (value: any) => string;

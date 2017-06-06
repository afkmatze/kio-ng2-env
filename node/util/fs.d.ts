/// <reference types="node" />
import { Observable } from 'rxjs';
export declare function readFile(filepath: string): Observable<Buffer>;
export declare function readFile(filepath: string, encoding: string): Observable<string>;

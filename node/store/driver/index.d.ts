import { JSONReader, JSONWriter } from './json';
import { EnvWriter } from './writer';
import { EnvReader } from './reader';
export { EnvWriter, EnvReader };
export declare type DriverType = 'json' | string;
export declare type EnvDriver<T> = EnvReader<T> | EnvWriter<T>;
export declare type DriverConstructor<T, D extends EnvDriver<T>> = {
    new (...args: any[]): D;
};
export declare const isDriverConstructor: <T, D extends EnvDriver<T>>(other: any) => other is DriverConstructor<T, D>;
export interface Driver<T> {
    type?: T;
    Reader: DriverConstructor<T, EnvReader<T>>;
    Writer: DriverConstructor<T, EnvWriter<T>>;
}
export declare const isDriver: <T>(other: any) => other is Driver<T>;
export interface DriverTypeMap<T extends DriverType> {
    [key: string]: Driver<T>;
}
export declare const DriverTypes: {
    'json': {
        Reader: typeof JSONReader;
        Writer: typeof JSONWriter;
    };
};
export declare const isDriverKey: (key: any) => key is "toString" | "charAt" | "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" | "localeCompare" | "match" | "replace" | "search" | "slice" | "split" | "substring" | "toLowerCase" | "toLocaleLowerCase" | "toUpperCase" | "toLocaleUpperCase" | "trim" | "length" | "substr" | "valueOf" | "codePointAt" | "includes" | "endsWith" | "normalize" | "repeat" | "startsWith" | "anchor" | "big" | "blink" | "bold" | "fixed" | "fontcolor" | "fontsize" | "italics" | "link" | "small" | "strike" | "sub" | "sup";
export declare const createReader: <T, R extends EnvReader<T>>(driverType: string, ...args: any[]) => R;
export declare const createWriter: <T, R extends EnvWriter<T>>(driverType: string, ...args: any[]) => R;
export interface DriverInstance<T extends DriverType> {
    reader: EnvReader<T>;
    writer: EnvWriter<T>;
}
export declare const isDriverInterface: <T extends string>(other: any) => other is DriverInstance<T>;

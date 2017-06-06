import { EnvWriter } from './writer';
import { EnvReader } from './reader';
export declare enum DriverTypes {
    json = 0,
}
export declare type EnvDriver<T extends DriverTypes> = EnvReader<T> | EnvWriter<T>;
export interface IConstructor<B extends Object> {
    new (...args: any[]): B;
}
export interface DriverConstructor<T extends DriverTypes> extends IConstructor<T> {
}

import { Location } from './interfaces';
import { LocationType } from './location.type';
export declare abstract class EnvLocation<T extends LocationType> implements Location<T> {
    readonly type: T;
    readonly name: string;
    constructor(type: T, name: string);
    toString(): string;
}

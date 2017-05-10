import { Location, FileLocation, Local } from './interfaces';
import * as Types from './location.type';
export declare const isLocation: <T extends Types.LocationType>(location: any) => location is Location<T>;
export declare const isFileLocation: (location: any) => location is FileLocation;
export declare const isLocalLocation: (location: any) => location is Local;

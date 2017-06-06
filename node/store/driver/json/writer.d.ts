import { FileWriter } from '../writer.file';
export declare class JSONWriter<T> extends FileWriter<T> {
    encodeData(data: T): string;
}

/// <reference types="node" />
import { AssertionError } from 'assert';
export interface AsyncAssertion extends Promise<void> {
}
export interface SyncAssertion {
    (): void;
}
export declare type AssertionHandler = SyncAssertion | AsyncAssertion;
export declare const assert: <V, T>(expected: V, actual: T, message?: string) => void;
export declare const assertNot: <V, T>(expected: V, actual: T, message?: string) => void;
export interface IAssertion {
    <V>(value: V, message?: string): AssertionError;
    (): AssertionError;
}
export interface EqualComparision {
    <T>(left: T, other: any, typeCheck?: boolean): boolean;
}
export declare const compare: <T>(left: T, other: any, typeCheck?: boolean) => boolean;
export declare class File {
    protected filepath: string;
    constructor(filepath: string);
    renderMessage(negate: boolean, expectation: string): string;
    exists(negate?: boolean): SyncAssertion;
    contains(negate: boolean, data: string): AsyncAssertion;
}
export declare module file {
    function renderMessage(negate: boolean, filepath: string, expectation: string): string;
    function exists(negate: boolean, filepath: string): SyncAssertion;
    function contains(negate: boolean, filepath: string, content: string): AsyncAssertion;
}
export declare const json: (value: any) => any;
export declare const assertJSON: (expectedValue: any) => (value: any) => void;

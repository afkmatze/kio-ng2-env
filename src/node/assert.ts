import { existsSync } from 'rxfs'
import { readFile } from './util/fs'

import * as nodeAssert from 'assert'
import {AssertionError} from 'assert'

import { toJSON, toJSONValue } from './mock'

export interface AsyncAssertion extends Promise<void> {}

export interface SyncAssertion {
  ( ):void
}

export type AssertionHandler = SyncAssertion|AsyncAssertion

const renderMessage = ( subj:string, expectation:string, negate:boolean=false ) => {
  return `Expected ${subj}${negate ? ' not' : ''} to ${expectation}.`
}


const assertFn = <V, T>( negate:boolean, expected:V, actual:T, message?:string ):void => {

  if ( 'undefined' === typeof negate )
  {
    negate = false
  }

  if ( negate )
  {
    nodeAssert.notEqual ( actual, expected, message )
  }
  else
  {
    nodeAssert.equal ( actual, expected, message )
  }  
}

export const assert = <V, T>( expected:V, actual:T, message?:string ):void => {
  assertFn ( false, expected, actual, message )
}

export const assertNot = <V, T>( expected:V, actual:T, message?:string ):void => {
  assertFn ( true, expected, actual, message )
}


export interface IAssertion {
  <V>( value:V, message?:string ):AssertionError
  ():AssertionError
}

export interface EqualComparision {
  <T>( left:T, other:any, typeCheck?:boolean ):boolean
}

export const compare = <T>( left:T, other:any, typeCheck:boolean=false ):boolean => {
  if ( typeCheck && ( typeof left !== typeof other ) )
  {
    return false
  }

  return left === other
}

export class File {

  constructor(protected filepath:string){}

  renderMessage ( negate:boolean=false, expectation:string ){
    return renderMessage ( `file at "${this.filepath}"`, expectation, negate )
  }

  exists ( negate:boolean=false ):SyncAssertion {
    return () => assertFn(negate, true, existsSync(this.filepath), renderMessage(`file at "${this.filepath}"`,'exist',negate))
  }
  
  contains ( negate:boolean, data:string ):AsyncAssertion {
    return readFile(this.filepath)
      .map ( contents => {
        return (
            contents instanceof Buffer
            ? contents.toString('utf8')
            : contents
          )
      } )
      .toPromise()
      .then ( contents => {
        negate 
        ? nodeAssert.ok(compare(contents, data), this.renderMessage(negate, 'contains'))
        : nodeAssert.notEqual(compare(contents, data), true, this.renderMessage(negate, 'contains'))
      })
  }
}

//const boundFile = <M extends keyof File>( methodName:M ) => ( filepath:string ) => (new File(filepath))[methodName]

export module file {
  export function renderMessage(negate:boolean, filepath:string, expectation:string ) {
    return (new File(filepath)).renderMessage(negate,expectation)
  }

  export function exists(negate:boolean,filepath:string) {
    return (new File(filepath)).exists(negate)
  }

  export function contains(negate:boolean, filepath:string, content:string) {
    return (new File(filepath)).contains(negate,content)
  }
}


export const json = ( value:string|any ) => {
  if ( 'string' !== typeof value )
  {
    return json(toJSONValue(value))
  }
  
  return {
    equal: ( negate:boolean, other:string|any ):void => {
        negate 
        ? nodeAssert.ok(compare(value, other), renderMessage('json', 'contains', negate))
        : nodeAssert.notEqual(compare(value, other), true, renderMessage('json', 'contains', negate))
    }
  }
}


export const assertJSON = ( expectedValue:any|string ) => {
  const expectedJSON:string = toJSONValue(expectedValue)
  return ( value:any|string ) => {
    const jsonValue = toJSON(value)
    json(jsonValue).equal(expectedValue)
  }
}

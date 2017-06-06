import * as path from 'path'
import * as fs from 'fs'
import { tmp, exists, readFile } from 'rxfs'

import { Observable } from 'rxjs'

export const encodeJSON = ( data:any ):string => JSON.stringify(data, null, '  ')
export const decodeJSON = ( data:string ):any => JSON.parse(data)

export module file {
  export const read = ( filepath:string ):Observable<string> => {
    return Observable.fromPromise(new Promise((resolve,reject)=>{
      fs.readFile(filepath,'utf8',(error,result)=>{
        error ? reject(error) : resolve(result)
      })
    }))
  }

  export const name = ( fileType?:string, prefix:string='tmp.' ) => {
    const ext = fileType ? '.'+fileType : ''
    return `${prefix}${Date.now()}${ext}`
  }
}

/**
 * @brief      mock json file with default content
 *
 * @param      defaultContent  data to write in json format
 *
 * @return     filepath of temporary file
 */
export const mockJSONFile = ( defaultContent:any ) => {
  return tmp.file(encodeJSON(defaultContent),true)
}



export const toJSON = ( value:string|any ):{[key:string]:any} => {
  if ( 'string' === typeof value )
  {
    return JSON.parse(value)
  }
  return value
}

export const toJSONValue = ( value:string|any ):string => {
  return JSON.stringify(toJSON(value))
}

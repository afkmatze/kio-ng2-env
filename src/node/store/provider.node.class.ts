import { EnvProvider } from '../../common'
import { Observable } from 'rxjs'
import { existsSync } from 'rxfs'
import * as path from 'path'
import { 
  Driver, 
  isDriver,
  isDriverInterface,
  isDriverKey,
  DriverInstance, DriverType, DriverTypes, DriverTypeMap ,
  createReader,
  createWriter
} from './driver'



export const castDriver = <T extends DriverType>( driver:Driver<T>|DriverInstance<T>|T|string, ...args:any[] ):DriverInstance<T> => {
  if (  isDriver (driver) )
  {
    const reader = new driver.Reader(...args)
    const writer = new driver.Writer(...args)
    return {
      reader ,
      writer
    }
  }
  if ( isDriverInterface(driver) )
  {
    return driver
  }
  if ( isDriverKey(driver) )
  {
    return castDriver(DriverTypes[driver],...args)
  }
  if ( existsSync(driver) )
  {
    const ext = path.extname(driver)
    if ( isDriverKey(ext) )
    {
      return castDriver(ext,driver,...args)
    }
  }
}

export class NodeEnvProvider<T> extends EnvProvider<T> {

  constructor(
      driver:Driver<DriverType>|DriverInstance<DriverType>|DriverType|string
    )
  {
    super()

    this.driver = castDriver(driver)
    console.log('NodeEnvProvider with driver', this.driver, '\nOriginal', driver)
  }

  protected driver:DriverInstance<DriverType>

  read():Observable<T> {
    return this.driver.reader.read()
      .map ( sourceData => JSON.parse(sourceData) )
  }

  write(data:T|string):Observable<boolean> {
    const writer = this.driver.writer
    return writer.write(writer.encodeData(data))
  }

}
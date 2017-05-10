import * as fs from 'fs'
import * as path from 'path'
import { EnvProvider, ENV_FILEPATH } from '../../common'

const envData = require(ENV_FILEPATH)

const ROOT_DIR = path.resolve('./')

export class BrowserEnvProvider<T> extends EnvProvider<T> {

  read ():Promise<T> {
    return Promise.resolve(envData)
  }

}
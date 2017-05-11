import * as os from 'os'
import { Machine } from './interfaces'

const machine:Machine = {
  release: os.release(),
  type: os.type(),
  username: os.userInfo().username,
  arch: os.arch(),
  host: os.hostname()
}

export default machine
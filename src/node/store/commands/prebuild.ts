import * as os from 'os'
import { EnvStore, Project, BuildInfo } from '../../../common'
import { NodeEnvProvider } from '../provider.class'

import { branches } from '../../util/git'

export const command = ( store:EnvStore<Project,NodeEnvProvider<Project>> ) => {
  const info:BuildInfo = {
    buildCount: store.get('buildCount') || 0,
    buildBranch: store.get('buildBranch'),
    buildMachine: os.arch() + ' ' + os.hostname(),
    buildTime: new Date()
  }

  return branches().filter(b => b.indexOf('*')===0).take(1)
    .toPromise()
    .then ( branch => {
      //console.log('branchList',branch)
      info.buildBranch = branch
      info.buildCount++
      store.set(info)
      //console.log('set store', info)
      return store.save()
    } )
  
}
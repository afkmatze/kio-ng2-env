import * as os from 'os'
import { EnvStore, Project, BuildInfo } from '../../../common'
import { NodeEnvProvider } from '../provider.class'

import * as git from '../../git/exec'

export const command = ( store:EnvStore<Project,NodeEnvProvider<Project>> ) => {
  const info:BuildInfo = {
    buildCount: store.get('buildCount') || 0,
    buildBranch: store.get('buildBranch'),
    buildMachine: os.arch() + ' ' + os.hostname(),
    buildTime: new Date()
  }

  return git.branches().filter(b => b.current ).take(1)
    .toPromise()
    .then ( branch => {
      //console.log('branchList',branch)
      info.buildBranch = branch.name
      info.buildCount++
      store.set(info)
      //console.log('set store', info)
      return store.save()
    } )
  
}
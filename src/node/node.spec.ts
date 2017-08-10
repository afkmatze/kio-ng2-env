import 'mocha'
import { expect } from 'chai'
import * as path from 'path'
import { 
  NamedComponent, isNamedComponent, isNamedFragmentComponentStructure, isNamedComponentStructure
} from 'kio-ng2-component-routing'

import { env, project, createStore, createProvider, EnvStore, EnvProvider, Project } from './'

if ( !process.env.KIO_NG2_PROJECT )
{
  throw Error(`Please set environment variable KIO_NG2_PROJECT to a valid digitorial path`)
}
const projectRoot = path.resolve(process.env.KIO_NG2_PROJECT) 

const projectEnvFile = path.join(projectRoot,'next-digitorial.json')
const TEST_PROVIDER = createProvider(projectEnvFile)
const TEST_STORE = new EnvStore<Project>(TEST_PROVIDER,project(projectRoot))

describe('Test store',function(){

  describe(projectRoot,()=>{

    describe('provider',()=>{

      it('exists',()=>{
        expect(TEST_PROVIDER).to.be.instanceOf(EnvProvider)
      })

      it('has config file from args',()=>{
        expect(TEST_PROVIDER.filepath).to.be.equal(projectEnvFile)
      })

    })
    
    describe('store',function(){

      this.timeout(10 * 1000)

     it('is store',()=>{
       expect(TEST_STORE).to.be.instanceOf(EnvStore)
     })

     describe('reads',()=>{
       let testReadStore:EnvStore<Project>
       beforeEach((done)=> {
         env(projectRoot).subscribe ( store => {
           testReadStore = store
         },done,done)
       })
         
       it('is test store',()=>{
         expect(testReadStore).to.exist
       })
         
       it('has key "rootModule"',()=>{
         expect(testReadStore.hasKey('rootModule')).to.be.equal(true)
       })
                  
       it('has key "components"',()=>{
         const components:NamedComponent[] = testReadStore.get('components')
         expect(components).to.be.instanceOf(Array)
         components.forEach((component,idx) => {
           expect(component).to.contain.keys('name','type','modifiers')
         })
       })
         
       it('has key "lastBuild"',()=>{
         expect(testReadStore.hasKey('lastBuild')).to.be.equal(true)
       })
         
       it('has key "name"',()=>{
         expect(testReadStore.hasKey('name')).to.be.equal(true)
       })

       it('writes',()=>{
         return testReadStore.save().toPromise()
           .then ( success => {
             expect(success).to.be.equal(true)
           } )
       })

     })

    })

  })

})
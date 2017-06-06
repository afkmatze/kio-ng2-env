import 'mocha'
import { expect } from 'chai'
import * as path from 'path'
import { 
  NamedComponent, isNamedComponent, isNamedFragmentComponentStructure, isNamedComponentStructure
} from 'kio-ng2-component-routing'

import { env, project, createStore, createProvider, EnvStore, EnvProvider, Project } from './'

const projectRoot = process.env.KIO_NG2_PROJECT || path.resolve('./test-parent')

const projectEnvFile = path.join(projectRoot,'next-digitorial.json')
const TEST_PROVIDER = createProvider(projectEnvFile)
const TEST_STORE = new EnvStore<Project>(TEST_PROVIDER,project(projectRoot))

describe('Test store',function(){

  describe(projectRoot,()=>{

    describe('provider',()=>{

      it('exists',()=>{
        expect(TEST_PROVIDER).to.be.instanceOf(EnvProvider)
      })
    })

    describe('project info',()=>{

      it('reads test parent project',()=>{

        return project(projectRoot).toPromise().then ( projectInfo => {
          expect(projectInfo).to.contain.keys('name','rootModule','lastBuild')
        } )

      })

    })
    
    describe(`store for "${projectRoot}"`,function(){

      this.timeout(10 * 1000)

     it('is store',()=>{
       expect(TEST_STORE).to.be.instanceOf(EnvStore)
     })

     xdescribe('reads',()=>{
       let testReadStore:EnvStore<Project>
       beforeEach((done)=> {
         const storeSource = env(projectRoot)
         storeSource.subscribe ( store => {
           console.log('project store', store)
           testReadStore = store
         },done,done)
       })
         
       it('is instance of EnvStore',()=>{
         expect(testReadStore).to.be.instanceOf(EnvStore)
       })
         
       xit('has key "rootModule"',()=>{
         expect(testReadStore.hasKey('rootModule')).to.be.equal(true)
       })
                  
       xit('has key "components"',()=>{
         const components:NamedComponent[] = testReadStore.get('components')
         expect(components).to.be.instanceOf(Array)
         components.forEach((component,idx) => {
           expect(component).to.contain.keys('name','type','modifiers')
         })
       })
         
       xit('has key "lastBuild"',()=>{
         expect(testReadStore.hasKey('lastBuild')).to.be.equal(true)
       })
         
       xit('has key "name"',()=>{
         expect(testReadStore.hasKey('name')).to.be.equal(true)
       })

       xit('writes',()=>{
         return testReadStore.save().toPromise()
           .then ( success => {
             expect(success).to.be.equal(true)
           } )
       })

     })

    })

  })

})
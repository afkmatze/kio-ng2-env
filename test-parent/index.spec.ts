import 'mocha'
import { expect } from 'chai'
import * as path from 'path'
import { api } from 'kio-ng2-env'


describe('test resolving',function(){
  
  describe('pathBefore',()=>{

    it('resolves module root path',()=>{
      expect(api.modules.resolve.rootPath()).to.equal(path.resolve('./'))
    })

    it('resolves env root path',()=>{
      expect(api.modules.resolve.moduleRootPath()).to.equal(path.resolve('../'))
    })

  })  


  describe('kio modules',()=>{

    let projectInfo 

    it('has project root',()=>{
      return api.updateProject().toPromise()
        .then ( info => {
          projectInfo = info
          console.log('projectInfo',projectInfo)
        } )
    }) 

    it('has root module',()=>{
      console.log('module',api.modules.resolve.rootModule())      
      expect(api.modules.resolve.rootModule()).to.be.an('object')
    })

    it ( 'emits kio modules', (done) =>{

      api.modules.resolve.kioModules()
        .map ( (filepath,idx) => {
          console.log('module',filepath)
          return filepath
        } )
        .subscribe ( (filepath) => {
          expect(filepath).to.be.a('object')
        } , done , done )

    } )

  })

})
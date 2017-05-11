import 'mocha'
import { expect } from 'chai'
import { api } from 'kio-ng2-env'


describe('test resolving',function(){
  
  describe('pathBefore',()=>{

    it('resolves module root path',()=>{
      console.log('api',api)
      expect(api.modules.resolve.rootPath()).to.equal('')
    })

  })  


  describe('kio modules',()=>{

    it ( 'emits kio modules', (done) =>{

      api.modules.resolve.kioModules()
        .map ( (filepath,idx) => {
          return filepath
        } )
        .subscribe ( (filepath) => {
          expect(filepath).to.be.a('string')
        } , done , done )

    } )

  })

})
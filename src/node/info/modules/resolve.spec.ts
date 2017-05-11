import 'mocha'
import * as path from 'path'
import { expect } from 'chai'
import * as resolve from './resolve'

describe('test resolving',function(){
  
  describe('pathBefore',()=>{

    it('resolves module root path',()=>{
      const p = resolve.moduleRootPath()
      expect(p).to.be.a('string')
      expect(p).to.be.equal(path.resolve('./'))
    })

  })  


  describe('kio modules',()=>{

    it ( 'emits kio modules', (done) =>{

      resolve.kioModules()
        .map ( (filepath,idx) => {
          return filepath
        } )
        .subscribe ( (filepath) => {
          expect(filepath).to.be.a('string')
        } , done , done )

    } )

  })

})
import 'mocha'
import { expect } from 'chai'
import { createStore, api } from './'

describe('Test store',function(){
  
  describe('unloaded',function(){

    const envData = require('../../kio-env.json')
    let keys = Object.keys(envData)
    let store 
    before(()=>{
      store = createStore()
    })

    it('exists',function(){

      expect(store).to.be.an("object")

    })


    it('throws on save',function(){
      expect(()=>store.save()).to.throw('Cannot save before load')
    })


    it('loads',function(){
      return store.load()
        .then ( st => {
          expect(st.data).to.be.deep.equal(envData)
        } )
    })

    describe('getter',()=>{

      before(()=>{
        store = createStore()
        return store.load()
      })
      
      keys.forEach ( (key,idx) => {

        it ( `store.get('${key}') === '${envData[key]}'`, () => {

          expect(store.get(key)).to.equal(envData[key])

        } )

      } )
    })

  })
    

  describe('loaded',function(){

    let store 
    let countBefore

    before(()=>{
      store = createStore()
      return store.load().then ( s => {
        countBefore = store.get('buildCount')
      } )
    })


    describe('api commands',()=>{


      it ( 'prebuild', () => {
        return api.prebuild()
      } )

      it( 'increased build count', ()=>{
        expect(store.get('buildCount')).to.equal(countBefore+1)
      })

    })

  })

})
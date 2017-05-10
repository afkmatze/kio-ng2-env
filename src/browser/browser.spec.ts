import 'jasmine'
import { createStore } from './'
const envData = require('../../kio-env.json')

describe('Test scope',function(){

  let store 
  beforeAll(()=>{
    store = createStore()
  })

  it('exists',function(){

    expect(store).toBeTruthy()

  })

  it('loads',function(){
    return store.load()
      .then ( st => {
        expect(st.data).toEqual(envData)
      } )
  })

  it('throws on save',function(){
    expect(store.save).toThrowError()
  })

  describe('getter',()=>{

    const keys = Object.keys(envData)

    keys.forEach ( (key,idx) => {

      it ( `store.get('${key}') === '${envData[key]}'`, () => {

        expect(store.get(key)).toEqual(envData[key])

      } )

    } )

  })

})
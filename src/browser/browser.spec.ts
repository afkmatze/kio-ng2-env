import 'jasmine'
import defaultStore from './'
import { Project, isProject, isProjectProp } from '../common'
const envData = require('../../kio-ng2-env.json')

describe('Test scope',function(){

  it('exists',function(){

    expect(defaultStore).toBeTruthy()

  })

  it('has "name"',function(){
    expect(defaultStore.hasKey('name')).toBeTruthy()
  })

  it('throws on save',function(){
    expect(defaultStore.save).toThrowError()
  })

  describe('getter',()=>{

    const keys = Object.keys(envData)
    keys.forEach ( (key,idx) => {
      if ( isProjectProp (key) )
      {
        it ( `store.get('${key}') === '${envData[key]}'`, () => {
          expect(defaultStore.get(key)).toEqual(envData[key])
        } )
      }

    } )

  })

})
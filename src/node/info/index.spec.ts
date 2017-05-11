import 'mocha'
import { expect } from 'chai'
import { update } from './'

describe('Test store',function(){

  let updateData 

  it('updates initially',(done)=>{

    update().subscribe(info => {
      expect(info).to.be.an('object')
      updateData = info
      console.log('info',info)
    },done,done)

  })

  it('updates data',(done)=>{
  
    update(updateData).subscribe(info => {
      expect(info.buildCount).to.equal(updateData.buildCount+1)
      console.log('info',info)
    },done,done)

  })

})
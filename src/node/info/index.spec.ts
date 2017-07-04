import 'mocha'
import { expect } from 'chai'
import { update } from './'

describe('Test store',function(){

  let updateData 

  it('updates initially',(done)=>{

    update(process.env.KIO_NG2_PROJECT).subscribe(info => {
      expect(info).to.be.an('object')
      updateData = info
      //console.log('info',info)
    },done,done)

  })

  it('updates data',(done)=>{
  
    update(process.env.KIO_NG2_PROJECT,updateData).subscribe(info => {
      expect(info.buildCount).to.equal(updateData.buildCount+1)
      //console.log('info',info)
    },done,done)

  })

})
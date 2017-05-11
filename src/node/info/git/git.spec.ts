import 'mocha'
import { expect } from 'chai'
import { branches, commits } from './exec'

describe('Test store',function(){
  
  describe('branches',function(){

    it('lists', () => {

      return branches().toArray().toPromise().then ( branchesList => {
        expect(branchesList).to.be.an('array')
        branchesList.forEach ( item => {
          expect(item).to.have.keys('commit','name','current','message')
        } )
      } )

    })

  })

  describe('commits',function(){

    it('lists', () => {
      return commits().toArray().toPromise().then ( commitsList => {
        expect(commitsList).to.be.an('array')
        commitsList.forEach ( commit => {
          expect(commit).to.have.keys('hash','message')
        } )
      } )

    })

  })

})
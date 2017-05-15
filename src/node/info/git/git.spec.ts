import 'mocha'
import { expect } from 'chai'
import { branches, commits } from './exec'
import { GitRepository } from './'
import { RemoteType } from '../../../common'
import * as path from 'path'

describe('Test git repository',function(){
  
  describe('branches',function(){

    it('lists', () => {

      return branches(process.cwd()).toArray().toPromise().then ( branchesList => {
        expect(branchesList).to.be.an('array')
        branchesList.forEach ( item => {
          expect(item).to.have.keys('commit','name','current','message')
        } )
      } )

    })

  })

  describe('commits',function(){

    it('lists', () => {
      return commits(process.cwd()).toArray().toPromise().then ( commitsList => {
        expect(commitsList).to.be.an('array')
        commitsList.forEach ( commit => {
          expect(commit).to.have.keys('hash','message')
        } )
      } )

    })

  })


  describe('GitRepository',()=>{
    const repo = new GitRepository(path.resolve('./'))
    it('lists remotes',()=>{

      return repo.readRemotes().toArray().toPromise().then ( remotes => {
        expect(remotes).to.have.length.greaterThan(0)
      } )

    })
  })

})
import 'mocha'
import { expect } from 'chai'
import * as path from 'path'

import { 
  DriverTypes, 
  isDriver, isDriverConstructor, isDriverKey, 
  EnvWriter, EnvReader   
} from './driver'

import { NodeEnvProvider } from './provider.node.class'
import { Project } from '../../common'
import * as mocking from '../mock'
import * as assert from '../assert'

export interface IConstructor <T extends Object> {
  new (...args:any[]):T
}

export interface TestData {
  [key:string]: any
}

const TEST_DATA_0:TestData = {
  foo: 'bar',
  t: new Date()
}


describe('test node env store',function(){

  let testConfigFile:string = path.resolve('./'+mocking.file.name('json'))

  describe('env driver ', () => {

    describe('json',()=>{

      let driver = DriverTypes.json

      it('"DriverTypes.json" is a Driver',()=>{
        expect(driver).to.contain.keys('Reader','Writer')
        expect(driver.Reader.prototype).to.be.instanceOf(EnvReader)
        expect(driver.Writer.prototype).to.be.instanceOf(EnvWriter)
      })

      describe('constructor "Writer"',()=>{

        it('exists on Driver',()=>{
          expect(driver).to.contain.keys('Writer')          
        })

        it('extends EnvWriter',()=>{
          expect(driver.Writer.prototype).to.be.an.instanceOf(EnvWriter)
        })

        it('creates writer instance',()=>{
          const Writer = driver.Writer
          const writerInstance = new Writer(testConfigFile)
          expect(writerInstance).to.be.instanceOf(Writer)
        })        

      })
      
      describe('≤_Writer_≥',()=>{

        let testWriter:EnvWriter<TestData>
        before(()=>{
          testWriter = new driver.Writer(testConfigFile)
        })

        it('writes config data',()=>{
          expect(()=>testWriter.write(TEST_DATA_0)).to.not.throw()
          const jsonData = mocking.toJSONValue(TEST_DATA_0)
          return assert.file.contains(false,testConfigFile,jsonData)
        })

      })

      describe('constructor "Reader"',()=>{

        it('exists on Driver',()=>{
          expect(driver).to.contain.keys('Reader')          
        })

        it('extends EnvReader',()=>{
          expect(driver.Reader.prototype).to.be.an.instanceOf(EnvReader)
        })

        it('creates reader instance',()=>{
          const readerInstance = new driver.Reader(testConfigFile)
        })
        

      })

    })

  })

  describe('env provider', () => {



  })  

})
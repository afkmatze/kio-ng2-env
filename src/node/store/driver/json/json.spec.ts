import 'mocha'
import { expect } from 'chai'
import * as path from 'path'
import * as fs from 'fs'
import { tmp, exists, readFile } from 'rxfs'

import { JSONReader, JSONWriter } from './'
import { Observable } from 'rxjs'

import { file, encodeJSON, decodeJSON, mockJSONFile, toJSON, toJSONValue } from '../../../mock'
import * as assert from '../../../assert'


export interface TestData {
  [key:string]: any
}

const TEST_DATA_0:TestData = {
  foo: 'bar',
  t: new Date()
}

const TEST_DATA_FILENAME = path.resolve('./'+file.name('json','tmp_testfile'))

const isEqualJSON = ( left:any|string, right:any|string ) => {
  const leftObj = toJSON ( left )
  const rightObj = toJSON ( right )
  const leftString = toJSONValue(leftObj)
  const rightString = toJSONValue(rightObj)
  return leftString === rightString
}

const assertJSONContent = ( testData:TestData ) => ( filepath:string ) => {
  assert.file.exists(false,filepath)

  return assert.file.contains(false,filepath,toJSONValue(testData))
}

describe('JSON driver',()=>{

  describe('Reader',()=>{


    let reader:JSONReader<TestData>
    let mockedFile:string

    before((done)=>{
      mockJSONFile(TEST_DATA_0).subscribe((filepath)=>{
        mockedFile = filepath
        reader = new JSONReader(filepath)
      },done,done)
    })

    after((done)=>{
      fs.unlink(mockedFile,done)
    })

    it('exists', ()=>{
      expect(reader).to.be.an.instanceOf(JSONReader)
    })

    describe('decoding',()=>{

      it('decodes data',()=>{
        const encodedData = encodeJSON(TEST_DATA_0)
        const decoded = reader.decodeData(encodedData)
        expect(decoded).to.deep.equal(decodeJSON(encodedData))
      })

    })

  })


  describe('Writer',()=>{

    let writer:JSONWriter<TestData>

    before (()=>{
      writer = new JSONWriter(TEST_DATA_FILENAME)
    })

    it('exists', ()=>{
      expect(writer).to.be.an.instanceOf(JSONWriter)
    })

    describe('encoding',()=>{

      it('encodes data',()=>{
        const encoded = writer.encodeData(TEST_DATA_0)
        expect(toJSONValue(encoded)).to.equal(toJSONValue(TEST_DATA_0))
      })

    })

    describe('writing',()=>{

      let writeSuccess:boolean

      before((done)=>{
        writer.write(TEST_DATA_0).subscribe ( success => {
            writeSuccess = success
        }, error => done(error), () => done() )
      })

      it('wrote file successfully',()=>{
        assert.file.exists(false,TEST_DATA_FILENAME)
      })

      it('wrote correct content',()=>{
        return assert.file.contains(false,TEST_DATA_FILENAME,toJSONValue(TEST_DATA_0))
      })

      after((done)=>{
        fs.unlink(TEST_DATA_FILENAME,done)
      })

    })


  })

})
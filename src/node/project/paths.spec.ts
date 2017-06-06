import 'mocha'
import { expect } from 'chai'
import { project, projectPath } from './'
import { ProjectPath } from '../../common'
import * as path from 'path'

const TEST_PROJECT_ROOT = path.resolve('./test-parent')

describe('Test project path',function(){

  let projectInfo

  beforeAll((done)=>{
    project(TEST_PROJECT_ROOT).subscribe( info => {
      projectInfo = info      
    } , done , done )
  })

  it(`has root path "${TEST_PROJECT_ROOT}"`,()=>{

    expect(projectPath(projectInfo)(ProjectPath.rootDirectory)).to.be.equal(TEST_PROJECT_ROOT)

  })


  it(`has env file path "${TEST_PROJECT_ROOT}/test-parent.json"`,()=>{

    expect(projectPath(projectInfo)(ProjectPath.rootDirectory)).to.be.equal(TEST_PROJECT_ROOT)

  })

})
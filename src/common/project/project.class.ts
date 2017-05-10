import * as path from 'path'
import { ProjectInfo, ProjectRootLocation, Project } from './interfaces'
import { isProjectInfo, isProjectRootLocation } from './project.type-checks'
import { isLocalLocation, isFileLocation } from '../location'

export class ProjectEnv implements Project {

  constructor (readonly name:string, readonly root:ProjectRootLocation) {}

  buildCount: number
  buildTime: Date
  buildMachine: string
  buildBranch: string 
}
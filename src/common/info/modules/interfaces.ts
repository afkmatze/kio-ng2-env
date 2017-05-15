export interface ModuleInfo {

  name:string

  version:string

  filepath:string
}

export interface RootModuleInfo extends ModuleInfo {
  children:ModuleInfo[]
}

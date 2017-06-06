"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxfs = require("rxfs");
const rxjs_1 = require("rxjs");
require("rxjs/add/operator/switch");
const encodeJSON = (data) => JSON.stringify(data, null, '  ');
const encodeData = (data) => {
    return new Buffer(encodeJSON(data));
};
const readOrCreateFile = (filepath, defaultData) => {
    return rxfs.exists(filepath)
        .flatMap(doesExist => doesExist
        ? rxfs.readFile(filepath, 'utf8')
        : rxfs.writeFile(filepath, rxjs_1.Observable.of(defaultData), 'utf8')
            .toArray()
            .flatMap(result => rxfs.readFile(filepath, 'utf8')))
        .map(jsonData => jsonData);
};
const readOrCreateJSON = (filepath, defaultData) => {
    return readOrCreateFile(filepath, encodeData(defaultData))
        .map(data => JSON.parse(data.toString('utf8')));
};
/*
export class NodeEnvProvider extends EnvProvider<Project> {

  constructor(readonly filepath?:string,protected storeDriver:DriverInstance<DriverType>){
    super()
  }

  protected resolveEnvFile ():string {
    console.log('this.filepath',this.filepath)
    return this.filepath
  }

  protected readEnvFile ():Observable<Project> {
    const envFilepath = this.resolveEnvFile ()
    //return this.storeDriver.reader.read()
  }

  protected toJSON (data:Project) {
    return JSON.stringify(data,null,'  ')
  }

  protected writeEnvFile ( data:Project ):Observable<boolean> {
    const envFilepath = this.resolveEnvFile ()
    return Observable.fromPromise(new Promise((resolve,reject)=>{
      fs.writeFile ( envFilepath, this.toJSON(data), 'utf8', ( error ) => {
        if ( error )
        {
          reject ( error )
        }
        else {
          resolve ( true )
        }
      } )
    }))
  }

  read ():Observable<Project> {
    return this.readEnvFile()
      .map ( project => {
        const {
          components=[]
        } = project

        project.components = components.map ( component => {
          if ( !component.modifiers )
          {
            component.modifiers = []
          }
          return component
        } )

        return project
      } )
  }

  create ( defaultData?:DefaultData<Project> ):Observable<boolean> {
    if ( !defaultData )
    {
      throw Error('No default data!')
    }
    if ( defaultData instanceof Observable )
    {
      return defaultData.flatMap ( data => {
        return this.create(data)
      } )
    }
    else if ( defaultData instanceof Promise )
    {
      return this.create(Observable.fromPromise(defaultData))
    }
    const data = JSON.stringify(defaultData,null,'  ')
    console.log('write data \n\x1b[2m%s\x1b[0m',data)
    return rxfs.writeFile(this.resolveEnvFile(),Observable.of(new Buffer(data)))
  }

  write ( data:Project ):Observable<boolean> {
    return this.writeEnvFile (data)
  }

  exists(){
    return rxfs.exists(this.resolveEnvFile())
  }
}*/ 
//# sourceMappingURL=provider.class.js.map
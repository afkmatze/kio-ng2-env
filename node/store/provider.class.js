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
<<<<<<< HEAD
    console.log('KIO_NG2_PROJECT', process.env.KIO_NG2_PROJECT)
    console.log('process.cwd()', process.cwd())
    return projectConfigFile(process.env.KIO_NG2_PROJECT || process.cwd())
=======
    console.log('this.filepath',this.filepath)
    return this.filepath
>>>>>>> master
  }

  protected readEnvFile ():Observable<Project> {
    const envFilepath = this.resolveEnvFile ()
<<<<<<< HEAD
    console.log('read env file at "%s"', envFilepath )
    return Observable.fromPromise(new Promise((resolve,reject)=>{
      fs.readFile ( envFilepath, 'utf8', ( error, content ) => {
        if ( error )
        {
          reject ( error )
        }
        else {
          resolve ( content )
        }
      } )
    }))
=======
    //return this.storeDriver.reader.read()
>>>>>>> master
  }

  protected toJSON (data:Project) {
    return JSON.stringify(data,null,'  ')
  }

<<<<<<< HEAD
  protected writeEnvFile ( data:T, filepath:string=this.resolveEnvFile () ):Observable<boolean> {
=======
  protected writeEnvFile ( data:Project ):Observable<boolean> {
    const envFilepath = this.resolveEnvFile ()
>>>>>>> master
    return Observable.fromPromise(new Promise((resolve,reject)=>{
      fs.writeFile ( filepath, this.toJSON(data), 'utf8', ( error ) => {
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
    //console.log('write data \n\x1b[2m%s\x1b[0m',data)
    return rxfs.writeFile(this.resolveEnvFile(),Observable.of(new Buffer(data)))
  }

<<<<<<< HEAD
  write ( data:T ):Observable<boolean> {
    return this.writeEnvFile (data).flatMap ( success => {
      if ( this.resolveEnvFile() !== ENV_FILEPATH )
      {
        return this.writeEnvFile(data,ENV_FILEPATH)
      }
      return Observable.of(success)
    } )
=======
  write ( data:Project ):Observable<boolean> {
    return this.writeEnvFile (data)
>>>>>>> master
  }

  exists(){
    return rxfs.exists(this.resolveEnvFile())
  }
}*/ 
//# sourceMappingURL=provider.class.js.map
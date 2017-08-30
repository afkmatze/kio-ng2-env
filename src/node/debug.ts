
const packageVersion = require('../package.json').version

export function log ( format:any, ...args:any[] ) 
export function log ( format:string|any, ...args:any[] ) 
{
  if ( 'string' !== typeof format ) {
    return log ( '', format, ...args )
  }

  if ( process.env.NODE_ENV === 'debug' ) {
    console.log ( '\x1b[2m%s\x1b[0m' + format, `[kio-ng2-env v${packageVersion}]`, ...args )
  }
}
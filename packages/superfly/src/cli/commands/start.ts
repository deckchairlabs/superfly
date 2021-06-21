import { Handler } from 'sade'
import { GlobalArgs } from '../../cli'
import createServer from './createServer'

type StartArgs = GlobalArgs & {
  port: number
}

const start: Handler = async (args: StartArgs, config) => {
  try {
    return createServer({
      root: process.cwd(),
      mode: 'production',
      port: args.port
    })
  } finally {
  }
}

export default start

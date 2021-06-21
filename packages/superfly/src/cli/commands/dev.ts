import { Handler } from 'sade'
import { GlobalArgs } from '../../cli'
import createServer from './createServer'

type DevArgs = GlobalArgs & {
  port: number
}

const dev: Handler = async (args: DevArgs, config) => {
  try {
    return createServer({
      root: process.cwd(),
      mode: 'development',
      port: args.port
    })
  } finally {
  }
}

export default dev

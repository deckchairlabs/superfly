import { Handler } from 'sade'
import createServer from './createServer'

const start: Handler = async () => {
  return createServer(process.cwd(), 'production')
}

export default start

import { Handler } from 'sade'
import createServer from './createServer'

const dev: Handler = async () => {
  return createServer(process.cwd(), 'development')
}

export default dev

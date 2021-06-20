import { Handler } from 'sade'
import createServer from '../../server'

const dev: Handler = async () => {
  const port = process.env.PORT || 3000
  const host = '0.0.0.0'

  const server = await createServer({
    mode: 'development'
  })

  return server.listen(port, host)
}

export default dev

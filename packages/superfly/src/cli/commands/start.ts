import { Handler } from 'sade'
import createServer from '../../server'

const start: Handler = async () => {
  const port = process.env.PORT || 3000
  const host = '0.0.0.0'

  const server = await createServer({
    mode: 'production'
  })

  return server.listen(port, host)
}

export default start

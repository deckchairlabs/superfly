import fastify from 'fastify'
import env from './env'
import { superfly } from './superfly'

const isProduction = env.isProduction
const port = process.env.PORT || 3000

const main = async () => {
  const app = fastify({
    //@ts-expect-error
    http2: isProduction,
    logger: true,
  })

  await app.register(superfly, {
    isProduction,
  })

  //@ts-expect-error
  app.get('*', app.createRenderHandler())

  await app.ready()
  await app.listen(port, '0.0.0.0')
}

main()

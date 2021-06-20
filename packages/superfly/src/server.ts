import fastify from 'fastify'
import superfly from '@deckchairlabs/fastify-superfly'

type CreateServerOptions = {
  mode: 'production' | 'development'
  http2?: boolean
}

export default async function createServer({ mode }: CreateServerOptions) {
  const isProduction = mode === 'production'

  const server = fastify({
    logger: isProduction
  })

  await server.register(superfly, {
    isProduction
  })

  server.get('*', server.createRenderHandler())
  await server.ready()

  return server
}

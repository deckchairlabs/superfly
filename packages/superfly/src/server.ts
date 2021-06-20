import fastify from 'fastify'
import superfly from '@deckchairlabs/fastify-superfly'

type CreateServerOptions = {
  mode: 'production' | 'development'
  http2?: boolean
}

export default async function createServer({ mode }: CreateServerOptions) {
  const server = fastify({
    logger: false
  })

  await server.register(superfly, {
    isProduction: mode === 'production'
  })

  server.get('*', server.createRenderHandler())

  await server.ready()

  return server
}

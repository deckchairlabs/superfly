import superfly, {
  SuperflyRendererFactory
} from '@deckchairlabs/fastify-superfly'
import { createRenderer } from '@deckchairlabs/vite-plugin-superfly'
import fastify from 'fastify'
import pino from 'pino'

type CreateServerOptions = {
  mode: 'production' | 'development'
  http2?: boolean
}

export default async function createServer({ mode }: CreateServerOptions) {
  const isProduction = mode === 'production'

  const logger = pino({
    prettyPrint: !isProduction,
    prettifier: !isProduction ? require('pino-colada') : undefined
  })

  const server = fastify({
    logger: logger
  })

  await server.register(superfly, {
    isProduction,
    createRenderer: createRenderer as SuperflyRendererFactory
  })

  server.get('*', server.createRenderHandler())
  await server.ready()

  return server
}

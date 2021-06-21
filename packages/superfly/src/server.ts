import superfly, {
  SuperflyRendererFactory
} from '@deckchairlabs/fastify-superfly'
import { createRenderer } from '@deckchairlabs/vite-plugin-superfly'
import fastify from 'fastify'

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
    isProduction,
    createRenderer: createRenderer as SuperflyRendererFactory
  })

  server.get('*', server.createRenderHandler())
  await server.ready()

  return server
}

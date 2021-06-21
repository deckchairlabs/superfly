import superfly, {
  SuperflyRendererFactory
} from '@deckchairlabs/fastify-superfly'
import {
  createRenderer,
  createViteConfig
} from '@deckchairlabs/vite-plugin-superfly'
import fastify from 'fastify'
import { logger } from './logger'

type CreateServerOptions = {
  root: string
  mode: 'production' | 'development'
  http2?: boolean
}

export default async function createServer({
  root,
  mode
}: CreateServerOptions) {
  const isProduction = mode === 'production'

  const server = fastify({
    logger: isProduction || logger
  })

  await server.register(superfly, {
    root,
    isProduction,
    devServerConfig: createViteConfig(root),
    createRenderer: createRenderer as SuperflyRendererFactory
  })

  server.get('*', server.createRenderHandler())
  await server.ready()

  return server
}

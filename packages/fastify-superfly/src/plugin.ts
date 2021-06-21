import { RouteHandler } from 'fastify'
import fastifyCompress from 'fastify-compress'
import fastifyHelmet from 'fastify-helmet'
import fp from 'fastify-plugin'
import fastifyStatic from 'fastify-static'
import middie from 'middie'
import { SuperflyContext, SuperflyPluginOptions } from './types'
import { createInitialRequestContext, prependDoctype } from './utils'
import createViteDevServer from './vite'

declare module 'fastify' {
  interface FastifyInstance {
    createRenderHandler(
      superflyContext?: Partial<SuperflyContext>
    ): RouteHandler
  }
  interface FastifyRequest {
    superflyContext: SuperflyContext
  }
}

const superfly = fp<SuperflyPluginOptions>(async (fastify, options) => {
  const {
    isProduction,
    root = process.cwd(),
    createRenderer,
    devServerConfig,
    compress
  } = options

  let viteDevServer

  await fastify.register(fastifyHelmet, {
    contentSecurityPolicy: false
  })

  await fastify.register(fastifyCompress, compress)

  if (isProduction) {
    await fastify.register(fastifyStatic, {
      root: `${root}/dist/client/assets`,
      prefix: '/assets',
      immutable: true,
      cacheControl: true,
      maxAge: '1y'
    })
  } else {
    if (!devServerConfig) {
      throw new Error('No devServerConfig was provided.')
    }

    await fastify.register(middie)
    viteDevServer = await createViteDevServer(devServerConfig)
    fastify.use(viteDevServer.middlewares)
  }

  const renderPage = createRenderer({ viteDevServer, isProduction, root })

  fastify.addHook('preHandler', (request, _reply, done) => {
    request.superflyContext = createInitialRequestContext(request, isProduction)
    done()
  })

  fastify.decorate(
    'createRenderHandler',
    (superflyContext?: Partial<SuperflyContext>): RouteHandler => {
      return async function handler(request, reply) {
        const {
          renderResult,
          nothingRendered,
          statusCode = 404
        } = await renderPage({
          ...request.superflyContext,
          ...superflyContext
        })

        if (nothingRendered) {
          reply.status(404).send(null)
        } else if (renderResult) {
          const body = prependDoctype(renderResult)

          reply
            .status(statusCode)
            .headers(Object.fromEntries(renderResult.headers))
            .send(body)
        } else {
          reply.status(statusCode).send(renderResult)
        }
      }
    }
  )
})

export default superfly

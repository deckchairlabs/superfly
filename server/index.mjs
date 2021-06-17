// import './trace.mjs'
import fastify from 'fastify'
import openTelemetry from '@autotelic/fastify-opentelemetry'
import fastifyHelmet from 'fastify-helmet'
import middie from 'middie'
import compression from 'fastify-compress'
import fastifyStatic from 'fastify-static'
import { createPageRender } from 'vite-plugin-ssr'
import * as vite from 'vite'
import env from './env.mjs'

const isProduction = env.isProduction
const enableHttp2 = process.env.HTTP2 === 'true'
const port = process.env.PORT || 3000
const root = process.cwd()

const app = fastify({
  http2: enableHttp2,
  logger: true
})

app.register(openTelemetry, { serviceName: env.serviceName, wrapRoutes: true })

app.register(fastifyHelmet, {
  contentSecurityPolicy: false
})

app.register(compression, { global: true, })

let viteDevServer

if (isProduction) {
  await app.register(fastifyStatic, {
    root: `${root}/dist/client/assets`,
    prefix: '/assets'
  })
} else {
  await app.register(middie)
  viteDevServer = await vite.createServer({
    root,
    server: { middlewareMode: true },
  })
  app.use(viteDevServer.middlewares)
}

const renderPage = createPageRender({ viteDevServer, isProduction, root })

app.get('/favicon.ico', (_, reply) => {
  reply.header('cache-control', 'public, max-age=86400')
  reply.status(204)
  reply.send('')
})

app.get('*', async (request, reply) => {
  const renderContext = {
    url: request.url,
    isProduction,
    superfly: {
      service: env.serviceName,
      revision: env.serviceRevision,
    }
  }

  const { tracer } = request.openTelemetry()
  const renderSpan = tracer.startSpan('render')
  const result = await renderPage(renderContext)
  renderSpan.end()

  /**
   * We only want to cache things that can be cached
   */
  const cacheableStatusCodes = [200, 203, 204, 206, 300, 301, 404, 405, 410, 414, 501]

  if (isProduction && cacheableStatusCodes.includes(result.statusCode)) {
    reply.header('cache-control', 'public, max-age=900, stale-while-revalidate=86400, stale-if-error=86400')
  }

  if (result.nothingRendered) {
    reply.status(404).send(null)
  } else {
    reply
      .status(result.statusCode)
      .type('text/html')
      .send(result.renderResult)
  }
})

await app.ready()
await app.listen(port, '0.0.0.0')
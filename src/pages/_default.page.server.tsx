import { Response } from 'node-fetch'
import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { SuperflyContext } from '../../server/superfly'
import { SuperflyContextValue } from '../context/Superfly'
import { SuperflyServer } from '../components/Superfly'

type RenderContext = SuperflyContext & SuperflyContextValue

export async function render(context: RenderContext) {
  const body = ReactDOMServer.renderToNodeStream(
    <SuperflyServer url={context.request.url} context={context} />
  )

  if (!context.isProduction) {
    context.responseHeaders.set('cache-control', 'no-store')
  } else {
    context.responseHeaders.set(
      'cache-control',
      'public, max-age=900, stale-while-revalidate=86400, stale-if-error=86400'
    )
  }

  return new Response(body, {
    status: context.responseStatusCode,
    headers: {
      ...Object.fromEntries(context.responseHeaders),
      'content-type': 'text/html',
    },
  })
}

export async function addPageContext({ pageExports }: SuperflyContextValue) {
  const {
    meta: resolveMeta,
    links: resolveLinks,
    loader: resolveLoader,
  } = pageExports || {}

  const meta = (resolveMeta && (await resolveMeta())) || {}
  const links = (resolveLinks && (await resolveLinks())) || []
  const data = resolveLoader && (await resolveLoader())

  return {
    meta,
    links,
    pageProps: {
      data,
    },
  }
}

export const passToClient = ['url', 'pageProps', 'meta', 'links']

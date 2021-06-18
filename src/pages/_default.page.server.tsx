import { Response } from 'node-fetch'
import ReactDOMServer from 'react-dom/server'
import React from 'react'
import { SuperflyContext } from '../../server/superfly'
import { SuperflyContextValue } from '../context/Superfly'
import { SuperflyServer } from '../components/Superfly'

type RenderContext = SuperflyContext & SuperflyContextValue

export const render = async ({
  request,
  responseStatusCode,
  responseHeaders,
  ...context
}: RenderContext) => {
  const body = ReactDOMServer.renderToNodeStream(
    <SuperflyServer url={request.url} context={context} />
  )

  if (!context.isProduction) {
    responseHeaders.set('Cache-Control', 'no-store')
  }

  return new Response(body, {
    status: responseStatusCode,
    headers: {
      ...Object.fromEntries(responseHeaders),
      'Content-Type': 'text/html',
    },
  })
}

export const passToClient = ['url', 'pageProps', '_pageAssets', '_allPageIds']

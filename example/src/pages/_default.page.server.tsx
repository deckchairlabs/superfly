import { RenderResolver, Response } from '@deckchairlabs/superfly'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Root from '../Root'

export const render: RenderResolver = (context: any) => {
  const body = ReactDOMServer.renderToNodeStream(
    <Root>
      <context.Page />
    </Root>
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
      'content-type': 'text/html'
    }
  })
}

export const passToClient = ['url', 'pageProps']

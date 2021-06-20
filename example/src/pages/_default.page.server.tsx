import { Response } from 'node-fetch'
import ReactDOMServer from 'react-dom/server'
import React from 'react'
import Root from '../Root'

export async function render(context: any) {
  const body = ReactDOMServer.renderToNodeStream(
    <Root>
      <div>Hello World</div>
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

import { RenderFunction, Response } from '@deckchairlabs/superfly'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Root from '../Root'

export const render: RenderFunction = ({
  Page,
  isProduction,
  responseHeaders,
  responseStatusCode
}) => {
  const body = ReactDOMServer.renderToNodeStream(
    <Root>
      <Page />
    </Root>
  )

  if (!isProduction) {
    responseHeaders.set('cache-control', 'no-store')
  } else {
    responseHeaders.set(
      'cache-control',
      'public, max-age=900, stale-while-revalidate=86400, stale-if-error=86400'
    )
  }

  return new Response(body, {
    status: responseStatusCode,
    headers: {
      ...Object.fromEntries(responseHeaders),
      'content-type': 'text/html'
    }
  })
}

export const passToClient = ['url']

import ReactDOMServer from 'react-dom/server'
import React from 'react'
import Root from './_default/Root'

type RenderContext = {
  Page: React.ComponentType
  pageProps: any
}

export function render({ Page, pageProps }: RenderContext) {
  return ReactDOMServer.renderToNodeStream(
    <Root>
      <Page {...pageProps} />
    </Root>
  )
}

export const passToClient = ['pageProps', 'documentProps']

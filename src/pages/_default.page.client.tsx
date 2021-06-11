import React from 'react'
import ReactDOM from 'react-dom'
import { getPage } from 'vite-plugin-ssr/client'
import Root from './_default/Root'

async function hydrate() {
  const pageContext = await getPage()
  const { Page } = pageContext

  ReactDOM.hydrate(
    <Root>
      <Page {...pageContext.pageProps} />
    </Root>,
    document
  )
}

hydrate()

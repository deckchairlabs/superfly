import { getMDXComponent } from 'mdx-bundler/client'
import React from 'react'
import ReactDOM from 'react-dom'
import { getPage } from 'vite-plugin-ssr/client'
import { ClientContext } from '../context/Client'
import mdxComponents from './_default/components'
import Root from './_default/Root'

async function hydrate() {
  const pageContext = await getPage()
  const { Page, pageProps } = pageContext

  const Content = getMDXComponent(pageProps.code, {
    JSX: await import('react/jsx-runtime'),
  })

  ReactDOM.hydrate(
    <ClientContext.Provider value={{}}>
      <Root {...pageProps}>
        <Page
          {...pageProps}
          children={<Content components={mdxComponents} />}
        />
      </Root>
    </ClientContext.Provider>,
    document
  )
}

hydrate()

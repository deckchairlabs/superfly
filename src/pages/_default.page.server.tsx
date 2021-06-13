import ReactDOMServer from 'react-dom/server'
import { getMDXComponent } from 'mdx-bundler/client'
import { bundleMDX } from 'mdx-bundler'
import React from 'react'
import Root from './_default/Root'
import mdxComponents from './_default/components'
import { firestore } from '../services/firebase'

type RenderContext = {
  Page: React.ComponentType
  pageProps: any
}

export function render({ Page, pageProps }: RenderContext) {
  const Content = getMDXComponent(pageProps.code)

  return ReactDOMServer.renderToNodeStream(
    <Root {...pageProps}>
      <Page {...pageProps} children={<Content components={mdxComponents} />} />
    </Root>
  )
}

type PageContext = {
  url: string
  urlNormalized: string
  urlPathname: string
  isProduction: boolean
}

export async function addPageContext(pageContext: PageContext) {
  const normalizedUrl = pageContext.urlNormalized.endsWith('/')
    ? '/index'
    : pageContext.urlNormalized

  const documentReference = firestore.doc(`pages${normalizedUrl}`)
  const documentSnapshot = await documentReference.get()

  const data = documentSnapshot.data()

  if (data && documentSnapshot.exists) {
    const result = await bundleMDX(data.content)
    return { pageProps: result }
  }

  return {}
}

export const passToClient = ['pageProps', 'documentProps']

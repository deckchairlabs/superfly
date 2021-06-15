import ReactDOMServer from 'react-dom/server'
import { getMDXComponent } from 'mdx-bundler/client'
import { bundleMDX } from 'mdx-bundler'
import React from 'react'
import Root from './_default/Root'
import mdxComponents from './_default/components'
// import { firestore } from '../services/firebase'

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
  pageProps: any
}

export async function addPageContext(pageContext: PageContext) {
  // const normalizedUrl = pageContext.urlNormalized.endsWith('/')
  //   ? `${pageContext.urlNormalized}index`
  //   : pageContext.urlNormalized

  // const documentPath = normalizedUrl
  //   .split('/')
  //   .filter(Boolean)
  //   .join('/children/')

  // const documentReference = firestore.doc(`pages/${documentPath}`)
  // const documentSnapshot = await documentReference.get()

  // const data = documentSnapshot.data()
  let content: string = `<Box padding={[2, 3]}>
    <Heading>Hello World</Heading>
    <Box>
      <strong>Last rendered:</strong> ${new Date().toUTCString()}
    </Box>
    <Box><strong>Revision:</strong> ${pageContext.pageProps.revision}</Box>
  </Box>`

  // if (data && documentSnapshot.exists) {
  //   content = data.content
  // }

  const result = await bundleMDX(content)
  return { pageProps: result }
}

export const passToClient = ['pageProps', 'documentProps']

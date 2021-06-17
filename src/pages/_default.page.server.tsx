import ReactDOMServer from 'react-dom/server'
import { getMDXComponent } from 'mdx-bundler/client'
import { bundleMDX } from 'mdx-bundler'
import React from 'react'
import Root from './_default/Root'
import mdxComponents from './_default/components'
import { ServerContext } from '../context/Server'
// import { firestore } from '../services/firebase'

type RenderContext = {
  Page: React.ComponentType
  pageId: string
  url: string
  isProduction: boolean
  pageProps: any
  pageExports: {
    links?: () => Promise<any>
  }
}

export async function render({
  Page,
  pageProps,
  ...renderContext
}: RenderContext) {
  const Content = getMDXComponent(pageProps.code, {
    JSX: await import('react/jsx-runtime'),
  })

  return ReactDOMServer.renderToNodeStream(
    <ServerContext.Provider
      value={{
        pageId: renderContext.pageId,
        isProduction: renderContext.isProduction,
        pageProps,
      }}
    >
      <Root {...pageProps}>
        <Page
          {...pageProps}
          children={<Content components={mdxComponents} />}
        />
      </Root>
    </ServerContext.Provider>
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
    <Box as="nav" paddingY={3}>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/projects">Projects</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </Box>
    <Box>
      <strong>Last rendered:</strong> ${new Date().toUTCString()}
    </Box>
    <Box><strong>Revision:</strong> ${pageContext.pageProps.revision}</Box>
  </Box>
`

  // if (data && documentSnapshot.exists) {
  //   content = data.content
  // }

  const result = await bundleMDX(content, {
    globals: {
      'react/jsx-runtime': {
        varName: 'JSX',
        namedExports: ['Fragment', 'jsx', 'jsxs'],
      },
    },
  })

  return { pageProps: { ...result, ...pageContext.pageProps } }
}

export const passToClient = ['pageProps', 'documentProps']

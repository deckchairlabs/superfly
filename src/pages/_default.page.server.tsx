import ReactDOMServer from 'react-dom/server'
import { getMDXComponent } from 'mdx-bundler/client'
import { bundleMDX } from 'mdx-bundler'
import React from 'react'
import Root from './_default/Root'
import mdxComponents from './_default/components'
import { PageAsset, ServerContext } from '../context/Server'
// import { firestore } from '../services/firebase'

type RenderContext = {
  Page: React.ComponentType
  url: string
  isProduction: boolean
  pageProps: any
  pageExports: {
    links?: () => Promise<any>
  }
  _pageId: string
  _pageAssets: PageAsset[]
  _pageContextClient: any
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
        url: renderContext.url,
        isProduction: renderContext.isProduction,
        pageAssets: renderContext._pageAssets,
        pageContext: renderContext._pageContextClient,
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
  </Box>
`

  const result = await bundleMDX(content, {
    globals: {
      'react/jsx-runtime': {
        varName: 'JSX',
        namedExports: ['Fragment', 'jsx', 'jsxs'],
      },
    },
  })

  pageContext.pageProps = {
    ...pageContext.pageProps,
    code: result.code,
    frontmatter: result.frontmatter,
  }

  return pageContext
}

export const passToClient = ['url', 'pageProps', '_pageAssets']

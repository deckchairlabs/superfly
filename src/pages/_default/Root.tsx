import React, { ReactNode } from 'react'
import { ThemeProvider } from 'theme-ui'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import theme from '../../theme'
import components from './components'
import Scripts from './Scripts'
import Links from './Links'

type RootProps = {
  children?: ReactNode
  styleNonce?: string
  scriptNonce?: string
}

export default function Root({ children, ...pageProps }: RootProps) {
  const cache = createCache({
    key: 'css',
    nonce: pageProps.styleNonce,
  })

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>Superfly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
        <Links />
      </head>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme} components={components}>
          <body>
            {children}
            <Scripts />
          </body>
        </ThemeProvider>
      </CacheProvider>
    </html>
  )
}

import React, { ReactNode } from 'react'
import { ThemeProvider } from 'theme-ui'
import * as components from '@theme-ui/components'
import theme from '../../theme'
import Scripts from './Scripts'

type RootProps = {
  children?: ReactNode
}

export default function Root({ children }: RootProps) {
  return (
    <html>
      <head>
        <title>Superfly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <ThemeProvider theme={theme} components={components}>
        <body>
          {children}
          <Scripts />
        </body>
      </ThemeProvider>
    </html>
  )
}

import React, { ReactNode } from 'react'
import { Meta, Links, LiveReload, Scripts } from '@deckchairlabs/superfly'

type AppProps = {
  children?: ReactNode
}

export default function App({ children }: AppProps) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'development' && <LiveReload />}
        <Scripts />
      </body>
    </html>
  )
}

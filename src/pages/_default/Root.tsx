import React, { ReactNode } from 'react'
import Scripts from '../../components/Scripts'
import Links from '../../components/Links'
import Meta from '../../components/Meta'
import LiveReload from '../../components/LiveReload'

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

import React from 'react'
import { Outlet } from 'react-router-dom'
import Scripts from '../../components/Scripts'
import Links from '../../components/Links'
import Meta from '../../components/Meta'
import LiveReload from '../../components/LiveReload'

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
        <Scripts />
      </body>
    </html>
  )
}

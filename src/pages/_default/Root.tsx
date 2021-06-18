import React from 'react'
import { Outlet } from 'react-router-dom'
import Scripts from './Scripts'
import Links from './Links'
import Meta from './Meta'
import LiveReload from './LiveReload'

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

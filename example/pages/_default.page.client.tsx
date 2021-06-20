import { getPage } from 'vite-plugin-ssr/client'
import React from 'react'
import ReactDOM from 'react-dom'

async function hydrate() {
  const { Page } = await getPage()
  //@ts-expect-error
  ReactDOM.hydrate(document, <Page />)
}

hydrate()

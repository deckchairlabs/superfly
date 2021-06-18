import React from 'react'
import ReactDOM from 'react-dom'
import { getPage } from 'vite-plugin-ssr/client'
import { SuperflyClient } from '../components/Superfly'

async function hydrate() {
  const pageContext = await getPage()
  //@ts-expect-error
  ReactDOM.hydrateRoot(document, <SuperflyClient context={pageContext} />)
}

hydrate()

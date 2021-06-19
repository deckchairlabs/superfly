import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import {
  SuperflyContextProvider,
  SuperflyContextValue,
} from '../context/Superfly'
import App from '../pages/_default/Root'

type SuperflyServerProps = {
  url: string
  context: SuperflyContextValue
}

export function SuperflyServer({ url, context }: SuperflyServerProps) {
  return (
    <StaticRouter location={url}>
      <SuperflyContextProvider value={context}>
        <App>
          <context.Page {...context.pageProps} />
        </App>
      </SuperflyContextProvider>
    </StaticRouter>
  )
}

type SuperflyClientProps = {
  context?: any
}

export function SuperflyClient({ context }: SuperflyClientProps) {
  return (
    <BrowserRouter>
      <SuperflyContextProvider value={context}>
        <App>
          <context.Page {...context.pageProps} />
        </App>
      </SuperflyContextProvider>
    </BrowserRouter>
  )
}

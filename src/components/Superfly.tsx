import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { SuperflyContext, SuperflyContextValue } from '../context/Superfly'
import App from '../pages/_default/Root'

type SuperflyServerProps = {
  url: string
  context: SuperflyContextValue
}

export function SuperflyServer({ url, context }: SuperflyServerProps) {
  return (
    <StaticRouter location={url}>
      <SuperflyContext.Provider value={context}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<div>Hello World</div>} />
          </Route>
        </Routes>
      </SuperflyContext.Provider>
    </StaticRouter>
  )
}

type SuperflyClientProps = {
  context?: any
}

export function SuperflyClient({ context }: SuperflyClientProps) {
  return (
    <BrowserRouter>
      <SuperflyContext.Provider value={context}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<div>Hello World</div>} />
          </Route>
        </Routes>
      </SuperflyContext.Provider>
    </BrowserRouter>
  )
}

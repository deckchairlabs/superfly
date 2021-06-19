async function hydrate() {
  const { getPage } = await import('vite-plugin-ssr/client')
  const pageContext = await getPage()
  const React = await import('react')
  const ReactDOM = await import('react-dom')
  const { SuperflyClient } = await import('../components/Superfly')
  //@ts-expect-error
  ReactDOM.hydrateRoot(document, <SuperflyClient context={pageContext} />)
}

hydrate()

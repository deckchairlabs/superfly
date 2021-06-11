import React from 'react'

export default function Scripts() {
  //@ts-ignore
  if (!import.meta.env.DEV) {
    return null
  }

  return (
    <React.Fragment>
      <script type="module" src="/@vite/client"></script>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `
        import RefreshRuntime from "/@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
      `,
        }}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__vite_plugin_ssr__pageContext = {pageId:'/src/pages/index',pageProps:{}}`,
        }}
      ></script>
      <script type="module" src="/src/pages/_default.page.client.tsx"></script>
    </React.Fragment>
  )
}

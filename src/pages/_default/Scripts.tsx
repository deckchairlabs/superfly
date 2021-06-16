import React from 'react'

type ScriptsProps = {
  nonce?: string
}

export default function Scripts({ nonce }: ScriptsProps) {
  //@ts-ignore
  if (!import.meta.env.DEV) {
    return null
  }

  return (
    <React.Fragment>
      <script type="module" src="/@vite/client"></script>
      <script
        nonce={nonce}
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
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `window.__vite_plugin_ssr__pageContext = {pageId:'/src/pages/index',pageProps:{}}`,
        }}
      ></script>
    </React.Fragment>
  )
}

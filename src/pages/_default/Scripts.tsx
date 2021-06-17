import React from 'react'
import { useServerContext } from '../../context/Server'

export default function Scripts() {
  const { pageId, scriptNonce, pageProps, isProduction } = useServerContext()

  //@ts-ignore
  if (!import.meta.env.DEV) {
    return null
  }

  return (
    <React.Fragment>
      {!isProduction && (
        <>
          <script
            type="module"
            src="/@vite/client"
            suppressHydrationWarning
          ></script>
          <script
            nonce={scriptNonce}
            type="module"
            suppressHydrationWarning
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
        </>
      )}
      <script
        nonce={scriptNonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `window.__vite_plugin_ssr__pageContext = {
            pageId: ${JSON.stringify(pageId)},
            pageProps: ${JSON.stringify(pageProps)}
          }`,
        }}
      ></script>
      <script
        defer
        suppressHydrationWarning
        type="module"
        src="/src/pages/_default.page.client.tsx"
      ></script>
    </React.Fragment>
  )
}

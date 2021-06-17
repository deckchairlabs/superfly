import React from 'react'
import devalue from '@nuxt/devalue'
import { useServerContext } from '../../context/Server'

export default function Scripts() {
  const { scriptNonce, isProduction, pageAssets, pageContext, url } =
    useServerContext()

  console.log(url)

  const pageScripts = pageAssets?.filter(
    (asset) => asset.preloadType === null && asset.assetType === 'script'
  )

  return (
    <React.Fragment>
      {!isProduction && <DevScripts />}
      <script
        nonce={scriptNonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `window.__vite_plugin_ssr__pageContext = ${devalue(
            pageContext
          )}`,
        }}
      ></script>
      {pageScripts?.map((script, index) => (
        <script
          suppressHydrationWarning
          key={`page-script-${index}`}
          defer
          type="module"
          src={script.src}
        ></script>
      ))}
    </React.Fragment>
  )
}

function DevScripts() {
  return (
    <React.Fragment>
      <script
        type="module"
        src="/@vite/client"
        suppressHydrationWarning
      ></script>
      <script
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
    </React.Fragment>
  )
}

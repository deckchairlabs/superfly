import React from 'react'

export function LiveReload() {
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
          __html: `import RefreshRuntime from "/@react-refresh"
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
      `
        }}
      ></script>
    </React.Fragment>
  )
}

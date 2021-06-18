import React from 'react'
import devalue from '@nuxt/devalue'
import { useSuperflyContext } from '../../context/Superfly'

export default function Scripts() {
  const { _pageId, _pageAssets, _pageContextClient } = useSuperflyContext()

  const pageScripts = _pageAssets?.filter(
    (asset) => asset.preloadType === null && asset.assetType === 'script'
  )

  return (
    <React.Fragment>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `window.__vite_plugin_ssr__pageContext = ${devalue({
            _pageId,
            _pageContextClient,
            _pageAssets,
            pageAssets: _pageAssets,
          })}`,
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

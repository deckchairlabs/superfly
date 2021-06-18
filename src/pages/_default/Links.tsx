import React from 'react'
import { useSuperflyContext } from '../../context/Superfly'

export default function Links() {
  const { _pageAssets } = useSuperflyContext()

  const preloadScripts =
    _pageAssets?.filter((asset) => asset.preloadType === 'script') || []

  return (
    <React.Fragment>
      {preloadScripts.map((script, index) => (
        <link
          key={`script-preload-link-${index}`}
          rel="modulepreload"
          as="script"
          type="text/javascript"
          href={script.src}
        />
      ))}
    </React.Fragment>
  )
}

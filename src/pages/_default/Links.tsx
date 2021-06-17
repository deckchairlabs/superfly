import React from 'react'
import { useServerContext } from '../../context/Server'

export default function Links() {
  const { pageAssets } = useServerContext()

  const preloadScripts =
    pageAssets?.filter((asset) => asset.preloadType === 'script') || []

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

import React from 'react'
import { useSuperflyContext } from '../context/Superfly'

export default function Links() {
  const { _pageAssets, _pageContextClient: { links } = {} } =
    useSuperflyContext()

  const preloadScripts =
    _pageAssets?.filter((asset) => asset.preloadType === 'script') || []

  return (
    <React.Fragment>
      {(links as React.LinkHTMLAttributes<HTMLLinkElement>[]).map(
        (link, index) => (
          <link key={`link-${index}`} {...link} />
        )
      )}
      {preloadScripts.map((script, index) => (
        <link
          key={`script-preload-link-${index}`}
          rel="modulepreload"
          as="script"
          href={script.src}
        />
      ))}
    </React.Fragment>
  )
}

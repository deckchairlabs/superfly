import React from 'react'

export function Scripts() {
  return null
  // const { _pageId, _pageAssets, _pageContextClient, pageProps } =
  //   useSuperflyContext()

  // const pageScripts = _pageAssets?.filter(
  //   (asset) => asset.preloadType === null && asset.assetType === 'script'
  // )

  // return (
  //   <React.Fragment>
  //     <script
  //       dangerouslySetInnerHTML={{
  //         __html: `window.__vite_plugin_ssr__pageContext = ${devalue({
  //           _pageId,
  //           _pageAssets,
  //           _pageContextClient,
  //           pageProps,
  //         })}`,
  //       }}
  //     ></script>
  //     {pageScripts?.map((script, index) => (
  //       <script
  //         key={`page-script-${index}`}
  //         defer
  //         type="module"
  //         src={script.src}
  //       ></script>
  //     ))}
  //   </React.Fragment>
  // )
}

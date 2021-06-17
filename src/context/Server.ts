import React, { useContext } from 'react'

type ServerContextValue = {
  url: string
  pageId?: string
  pageProps?: any
  pageAssets?: PageAsset[]
  pageContext?: any
  isProduction: boolean
  scriptNonce?: string
  styleNonce?: string
}

export type PageAsset = {
  src: string
  assetType: 'preload' | 'script' | 'style'
  mediaType: string
  preloadType: 'script' | 'style'
}

export const ServerContext = React.createContext<ServerContextValue>({
  url: '/',
  isProduction: true,
  scriptNonce: undefined,
  styleNonce: undefined,
})

export function useServerContext() {
  return useContext(ServerContext)
}

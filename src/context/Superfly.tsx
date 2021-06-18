import React, { ReactNode, useContext } from 'react'

export type SuperflyContextValue = {
  Page: React.ComponentType<{}>
  url: string
  urlNormalized: string
  urlPathname: string
  _pageId?: string
  _allPageIds?: string
  _pageContextClient?: any
  _pageAssets?: PageAsset[]
  isProduction: boolean
}

export type PageAsset = {
  src: string
  assetType: 'preload' | 'script' | 'style'
  mediaType: string
  preloadType: 'script' | 'style'
}

export const SuperflyContext =
  React.createContext<SuperflyContextValue | null>(null)

type SuperflyContextProviderProps = {
  value: SuperflyContextValue
  children?: ReactNode
}

export function SuperflyContextProvider({
  value,
  children,
}: SuperflyContextProviderProps) {
  return (
    <SuperflyContext.Provider value={value}>
      {children}
    </SuperflyContext.Provider>
  )
}

export function useSuperflyContext() {
  const context = useContext(SuperflyContext)

  if (!context) {
    throw new Error('No Superfly context found.')
  }

  return context
}

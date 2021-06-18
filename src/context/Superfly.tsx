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
  pageProps?: any
  pageExports?: {
    links?: () => Promise<any[]> | any[]
    meta?: () => Promise<Meta> | Meta
  }
  isProduction: boolean
}

type Meta = {
  title?: string
  description?: string
  [x: string]: string | undefined
}

export type PageAsset = {
  src: string
  assetType: 'preload' | 'script' | 'style'
  mediaType: string
  preloadType: 'script' | 'style'
}

export type MetaResolver = () => Meta
export type LinksResolver = () => React.LinkHTMLAttributes<HTMLLinkElement>[]

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

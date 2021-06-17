import React, { useContext } from 'react'

type ServerContextValue = {
  pageProps?: any
  pageId?: string
  isProduction: boolean
  scriptNonce?: string
  styleNonce?: string
}

export const ServerContext = React.createContext<ServerContextValue>({
  isProduction: true,
  scriptNonce: undefined,
  styleNonce: undefined,
})

export function useServerContext() {
  return useContext(ServerContext)
}

import React, { useContext } from 'react'

type ClientContextValue = {
  scriptNonce?: string
  styleNonce?: string
}

export const ClientContext = React.createContext<ClientContextValue>({
  scriptNonce: undefined,
  styleNonce: undefined,
})

export function useClientContext() {
  return useContext(ClientContext)
}

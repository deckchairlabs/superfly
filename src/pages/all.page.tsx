import React, { ReactNode } from 'react'

export default function Page({ children }: { children: ReactNode }) {
  return <React.Fragment children={children} />
}

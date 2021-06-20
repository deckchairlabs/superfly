import React from 'react'
import { ReactNode } from 'react'

type SuperflyClientProps = {
  children?: ReactNode
}

export function SuperflyClient({ children }: SuperflyClientProps) {
  return <React.Fragment>{children}</React.Fragment>
}

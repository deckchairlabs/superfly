import React from 'react'
import { ReactNode } from 'react'

type SuperflyServerProps = {
  children?: ReactNode
}

export function SuperflyServer({ children }: SuperflyServerProps) {
  return <React.Fragment>{children}</React.Fragment>
}

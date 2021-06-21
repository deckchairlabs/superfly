import React from 'react'
import { MetaProps } from '../types'

export function Meta() {
  const meta: MetaProps = {}

  return (
    <React.Fragment>
      <meta charSet={meta?.charset || 'utf-8'} />
      <title>{meta?.title}</title>
      <meta name="description" content={meta?.description} />
      <meta name="viewport" content={meta?.viewport || 'width=device-width'} />
    </React.Fragment>
  )
}

import React from 'react'
import { useSuperflyContext } from '../context/Superfly'

export default function Meta() {
  const { _pageContextClient: { meta } = {} } = useSuperflyContext()

  return (
    <React.Fragment>
      <meta charSet={meta?.charset || 'utf-8'} />
      <title>{meta?.title}</title>
      <meta name="description" content={meta?.description} />
      <meta
        name="viewport"
        content={
          meta?.viewport ||
          'width=device-width,initial-scale=1,viewport-fit=cover'
        }
      />
    </React.Fragment>
  )
}

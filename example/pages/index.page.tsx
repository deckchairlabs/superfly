import React from 'react'
import { LinksResolver, MetaResolver } from '@deckchairlabs/superfly'

export const links: LinksResolver = () => {
  return []
}

export const meta: MetaResolver = () => {
  return {
    title: 'Home'
  }
}

export default function IndexPage(props: any) {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  )
}

import React from 'react'
import { LinksResolver, MetaResolver } from '../context/Superfly'

export const links: LinksResolver = () => {
  return []
}

export const meta: MetaResolver = () => {
  return {
    title: 'Testing',
  }
}

export default function IndexPage() {
  return <div>Hello World!</div>
}

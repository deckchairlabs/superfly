import {
  LinksFunction,
  LoaderFunction,
  MetaFunction
} from '@deckchairlabs/superfly'
import React from 'react'

export const links: LinksFunction = () => {
  return []
}

export const meta: MetaFunction = () => {
  return {
    title: 'Home'
  }
}

type LoaderData = {
  foo: string
}

export const loader: LoaderFunction<LoaderData> = () => {
  return { foo: 'bar' }
}

export default function IndexPage(props: any) {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  )
}

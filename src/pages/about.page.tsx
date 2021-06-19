import React from 'react'
import { MetaResolver } from '../context/Superfly'

export const meta: MetaResolver = () => {
  return {
    title: 'About',
  }
}

export async function loader() {
  return {
    foo: 'bar',
  }
}

export default function AboutPage() {
  return (
    <div>
      <h1>About</h1>
    </div>
  )
}

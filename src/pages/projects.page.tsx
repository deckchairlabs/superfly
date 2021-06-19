import React from 'react'
import { MetaResolver } from '../context/Superfly'

export const meta: MetaResolver = () => {
  return {
    title: 'Projects',
  }
}

export async function loader() {
  return {
    foo: 'bar',
  }
}

export default function ProjectsPage() {
  return (
    <div>
      <h1>Projects</h1>
    </div>
  )
}

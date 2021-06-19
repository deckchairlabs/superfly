import { Post } from '@prisma/client'
import React from 'react'
import { LinksResolver, MetaResolver } from '../context/Superfly'
import { prisma } from '../services/prisma'

export const links: LinksResolver = () => {
  return []
}

export const meta: MetaResolver = () => {
  return {
    title: 'Home',
  }
}

type LoaderData = { posts: Post[]; foo: string }

export const loader = async () => {
  const posts = await prisma.post.findMany()
  return {
    posts,
    foo: 'bar',
  }
}

export default function IndexPage(props: { data: LoaderData }) {
  console.log(props.data.posts)
  return (
    <div>
      <h1>Hello World!</h1>
      <ul>
        {props.data.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

import React from 'react'

export default function ErrorPage({ is404 }: { is404: boolean }) {
  if (is404) {
    return (
      <>
        <h1>404 Page Not Found</h1>
        This page could not be found.
      </>
    )
  } else {
    return (
      <>
        <h1>500 Internal Server Error</h1>
        Something went wrong.
      </>
    )
  }
}

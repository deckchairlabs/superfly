import React from 'react'
import { Box, Heading } from 'theme-ui'

export default function IndexPage(props: any) {
  return (
    <Box
      sx={{
        backgroundColor: ['blue', 'red'],
      }}
    >
      <Heading>Hello World!</Heading>
      <Heading>Last rendered: {new Date().toString()}</Heading>
      <Box>
        <strong>Page props</strong>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </Box>
    </Box>
  )
}

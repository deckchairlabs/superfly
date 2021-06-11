import React from 'react'
import { Box, Heading } from 'theme-ui'

export default function IndexPage(props: any) {
  return (
    <Box
      padding={[2, 4]}
      backgroundColor={['primary', 'secondary']}
      color="text"
    >
      <Heading marginBottom={3}>Hello World!</Heading>
      <Heading as="h3" marginBottom={3}>
        Last rendered: {new Date().toString()}
      </Heading>
      <Box>
        <strong>Page props</strong>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </Box>
    </Box>
  )
}

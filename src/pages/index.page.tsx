import React from 'react'
import { Box, Heading } from 'theme-ui'

export default function IndexPage() {
  return (
    <Box
      sx={{
        backgroundColor: ['blue', 'red'],
      }}
    >
      <Heading sx={{}}>
        Hello World!{' '}
        {new Date().toLocaleString('en-AU', {
          timeZone: 'Australia/Adelaide',
        })}
      </Heading>
    </Box>
  )
}

import React from 'react'
import { BoxProps, Box as ThemedBox } from 'theme-ui'

export default function Box(props: BoxProps) {
  return <ThemedBox {...props} />
}

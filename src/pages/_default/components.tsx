import React from 'react'
import * as components from '@theme-ui/components'

const mdxComponents = {
  Box: (props: any) => <components.Box {...props} />,
  Heading: (props: any) => <components.Heading {...props} />,
  h1: (props: any) => <components.Heading as="h1" {...props} />,
  h2: (props: any) => <components.Heading as="h2" {...props} />,
  h3: (props: any) => <components.Heading as="h3" {...props} />,
  h4: (props: any) => <components.Heading as="h4" {...props} />,
  h5: (props: any) => <components.Heading as="h5" {...props} />,
  h6: (props: any) => <components.Heading as="h6" {...props} />,
  ul: (props: any) => <components.Box as="ul" {...props} />,
  ol: (props: any) => <components.Box as="ol" {...props} />,
  li: (props: any) => <components.Box as="li" {...props} />,
}

export default mdxComponents

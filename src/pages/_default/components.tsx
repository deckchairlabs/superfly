import React from 'react'
import * as components from '@theme-ui/components'

const mdxComponents = {
  Button: (props: any) => <components.Button {...props} />,
  Box: (props: any) => <components.Box {...props} />,
  Flex: (props: any) => <components.Flex {...props} />,
  Grid: (props: any) => <components.Grid {...props} />,
  Heading: (props: any) => <components.Heading {...props} />,
  Link: (props: any) => <components.Link {...props} />,
  NavLink: (props: any) => <components.NavLink {...props} />,
  Image: (props: any) => <components.Image {...props} />,
  Paragraph: (props: any) => <components.Paragraph {...props} />,
  blockquote: (props: any) => <components.Box as="blockquote" {...props} />,
  code: (props: any) => <components.Box as="code" {...props} />,
  pre: (props: any) => <components.Box as="code" {...props} />,
  inlineCode: (props: any) => <components.Box as="code" {...props} />,
  em: (props: any) => <components.Text as="em" {...props} />,
  strong: (props: any) => <components.Text as="strong" {...props} />,
  del: (props: any) => <components.Text as="del" {...props} />,
  a: (props: any) => <components.Link {...props} />,
  img: (props: any) => <components.Image {...props} />,
  hr: (props: any) => <components.Divider {...props} />,
  p: (props: any) => <components.Paragraph {...props} />,
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

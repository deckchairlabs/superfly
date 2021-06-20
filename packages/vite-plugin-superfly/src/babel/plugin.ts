import { PluginObj } from '@babel/core'
import { visitor } from './visitor'

const superflyPlugin: PluginObj = {
  name: 'superfly',
  visitor: visitor
}

export default superflyPlugin

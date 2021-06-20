import { Plugin, Logger } from 'vite'
import { transform, ParserOptions } from '@babel/core'
import superflyPlugin from './babel/plugin'

/**
 * Most of the below is taken and modified form '@vitejs/plugin-react-refresh'
 */
let logger: Logger | null = null

const superfly = (): Plugin => {
  return {
    name: 'superfly',
    enforce: 'pre',
    configResolved(config) {
      logger = config.logger
    },
    async transform(code, id, ssr) {
      if (ssr) {
        return
      }

      if (!/\.(t|j)sx?$/.test(id) || id.includes('node_modules')) {
        return
      }

      if (!id.includes('.page.') || id.includes('.page.client')) {
        return
      }

      const parserPlugins: ParserOptions['plugins'] = [
        'jsx',
        'importMeta',
        'topLevelAwait',
        'classProperties',
        'classPrivateProperties',
        'classPrivateMethods'
      ]

      if (/\.tsx?$/.test(id)) {
        // it's a typescript file
        // TODO: maybe we need to read tsconfig to determine parser plugins to
        // enable here, but allowing decorators by default since it's very
        // commonly used with TS.
        parserPlugins.push('typescript', 'decorators-legacy')
      }

      const isReasonReact = id.endsWith('.bs.js')

      const program = await transform(code, {
        babelrc: false,
        configFile: false,
        filename: id,
        parserOpts: {
          sourceType: 'module',
          allowAwaitOutsideFunction: true,
          plugins: parserPlugins
        },
        generatorOpts: {
          decoratorsBeforeExport: true
        },
        plugins: [
          require('@babel/plugin-transform-react-jsx-self'),
          require('@babel/plugin-transform-react-jsx-source'),
          [superflyPlugin, { logger }]
        ],
        ast: !isReasonReact,
        sourceMaps: true,
        sourceFileName: id
      })

      if (!program || !program.code) {
        return
      }

      return { code: program.code, map: program.map }
    }
  }
}

export default superfly

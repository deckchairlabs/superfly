import { Plugin } from 'vite'
import { transform, ParserOptions, PluginObj } from '@babel/core'
import template from '@babel/template'
import * as t from '@babel/types'

/**
 * Most of the below is taken and modified form '@vitejs/plugin-react-refresh'
 */
export const superfly = (): Plugin => {
  return {
    name: 'superfly',
    enforce: 'pre',
    async transform(code, id, ssr) {
      if (ssr) {
        return
      }

      if (!/\.(t|j)sx?$/.test(id) || id.includes('node_modules')) {
        return
      }

      if (!id.endsWith('x') && !code.includes('react')) {
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
        'classPrivateMethods',
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
          plugins: parserPlugins,
        },
        generatorOpts: {
          decoratorsBeforeExport: true,
        },
        plugins: [
          require('@babel/plugin-transform-react-jsx-self'),
          require('@babel/plugin-transform-react-jsx-source'),
          superflyPlugin,
        ],
        ast: !isReasonReact,
        sourceMaps: true,
        sourceFileName: id,
      })

      if (!program || !program.code) {
        return
      }

      return { code: program.code, map: program.map }
    },
  }
}

const superflyPlugin: PluginObj = {
  name: 'superfly',
  visitor: {
    Program: {
      enter(program) {
        const buildSuperflyExport = template.statement(`
          export const __superfly = {
            hasLoader: %%hasLoader%%
          }
        `)

        const hasLoader = program.node.body.find((statement) => {
          if (t.isExportNamedDeclaration(statement)) {
            return isServerOnlyDeclaration(statement.declaration)
          }

          return false
        })

        const statement = buildSuperflyExport({
          hasLoader: t.booleanLiteral(Boolean(hasLoader)),
        })

        program.node.body.push(statement)
      },
    },
    /**
     * When generating chunks for the client, we want to remove
     * any code that should only run within Node.
     */
    ExportNamedDeclaration: {
      exit(declaration) {
        if (isServerOnlyDeclaration(declaration.node.declaration)) {
          declaration.remove()
        }
      },
    },
  },
}

function isServerOnlyDeclaration(
  node?: t.Declaration | null
): node is t.VariableDeclaration | t.FunctionDeclaration {
  if (!node) {
    return false
  }

  if (t.isVariableDeclaration(node)) {
    const firstDeclaration = node.declarations[0]
    if (t.isVariableDeclarator(firstDeclaration)) {
      return isServerOnlyIdentifier(firstDeclaration.id)
    }
  } else if (t.isFunctionDeclaration(node) && node.id) {
    return isServerOnlyIdentifier(node.id)
  }

  return false
}

function isServerOnlyIdentifier(identifier?: t.LVal | t.Identifier | null) {
  if (!identifier) {
    return false
  }

  return (
    isIdentifierWithName('loader', identifier) ||
    isIdentifierWithName('action', identifier) ||
    isIdentifierWithName('links', identifier)
  )
}

function isIdentifierWithName(
  name: string,
  node?: t.Node | null
): node is t.Identifier {
  return t.isIdentifier(node) && node.name === 'loader'
}

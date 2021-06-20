import { Visitor } from '@babel/core'
import template from '@babel/template'
import * as t from '@babel/types'
import { isServerOnlyDeclaration, programHasExportedIdentifier } from './utils'

export const visitor: Visitor = {
  Program: {
    enter(program) {
      const buildSuperflyExport = template.statement(`
        export const __superfly = {
          hasLoader: %%hasLoader%%,
          hasLinks: %%hasLinks%%
        }
      `)

      const hasLoader = programHasExportedIdentifier(program.node, 'loader')
      const hasLinks = programHasExportedIdentifier(program.node, 'links')

      const statement = buildSuperflyExport({
        hasLoader: t.booleanLiteral(Boolean(hasLoader)),
        hasLinks: t.booleanLiteral(Boolean(hasLinks))
      })

      program.node.body.push(statement)
    }
  },
  /**
   * When generating chunks for the client, we want to remove
   * any code that should only run within Node.
   */
  ExportNamedDeclaration: {
    exit(declaration) {
      if (isServerOnlyDeclaration(declaration.node.declaration)) {
        /**
         * TODO: Use the logger instance from vite to show which exports have
         * been removed from the page.
         */
        // logger?.info('Removing server side only declaration')

        declaration.remove()
      }
    }
  }
}

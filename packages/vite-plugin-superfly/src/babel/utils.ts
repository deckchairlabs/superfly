import * as t from '@babel/types'

export function programHasExportedIdentifier(program: t.Program, name: string) {
  return program.body.find(statement => {
    if (t.isExportNamedDeclaration(statement)) {
      if (isServerOnlyDeclaration(statement.declaration)) {
        if (t.isVariableDeclaration(statement.declaration)) {
          return someDeclarationIsIdentifierWithName(
            'links',
            statement.declaration.declarations
          )
        } else {
          return isIdentifierWithName('links', statement.declaration.id)
        }
      }
    }

    return false
  })
}

export function isServerOnlyDeclaration(
  node?: t.Declaration | null
): node is t.VariableDeclaration | t.FunctionDeclaration {
  if (!node) {
    return false
  }

  if (t.isVariableDeclaration(node)) {
    return node.declarations.some(declaration => {
      if (t.isVariableDeclarator(declaration)) {
        return isServerOnlyIdentifier(declaration.id)
      }
    })
  } else if (t.isFunctionDeclaration(node) && node.id) {
    return isServerOnlyIdentifier(node.id)
  }

  return false
}

export function someDeclarationIsIdentifierWithName(
  name: string,
  declarations: t.VariableDeclarator[]
) {
  return declarations.some(declaration => {
    if (declaration && t.isVariableDeclarator(declaration)) {
      return isIdentifierWithName(name, declaration.id)
    }
  })
}

export function isServerOnlyIdentifier(
  identifier?: t.LVal | t.Identifier | null
) {
  if (!identifier) {
    return false
  }

  return ['loader', 'action', 'links'].some(name =>
    isIdentifierWithName(name, identifier)
  )
}

export function isIdentifierWithName(
  name: string,
  node?: t.Node | null
): node is t.Identifier {
  return t.isIdentifier(node) && node.name === name
}

import { cosmiconfig } from 'cosmiconfig'

const moduleName = 'superfly'
const explorer = cosmiconfig(moduleName)

export async function resolveConfig(searchFrom?: string, filepath?: string) {
  if (filepath) {
    return loadConfig(filepath)
  } else {
    return searchConfig(searchFrom)
  }
}

export async function searchConfig(searchFrom?: string) {
  return explorer.search(searchFrom)
}

export async function loadConfig(filepath: string) {
  return explorer.load(filepath)
}

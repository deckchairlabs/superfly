import { cosmiconfig } from 'cosmiconfig'

const moduleName = 'superfly'
const explorer = cosmiconfig(moduleName)

export async function loadConfig() {
  try {
    return explorer.search()
  } catch (error) {
    console.error(error)
  }
}

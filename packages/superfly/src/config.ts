import { cosmiconfig } from 'cosmiconfig'
import { z, ZodError } from 'zod'
import kleur from 'kleur'

const moduleName = 'superfly'
const explorer = cosmiconfig(moduleName)

export const ConfigType = z.object({
  foo: z.string(),
  testing: z.string()
})

const heading = kleur.bold().underline()
const bullet = (text: string) => `${kleur.gray('-')} ${text}`

export async function resolveConfig(searchFrom?: string, filepath?: string) {
  if (filepath) {
    return loadConfig(filepath)
  } else {
    return searchConfig(searchFrom)
  }
}

export async function validateConfig(config: any, filepath?: string) {
  try {
    return ConfigType.parse(config)
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(formatZodError(error))
    }

    process.exit(1)
  }
}

export async function searchConfig(searchFrom?: string) {
  return explorer.search(searchFrom)
}

export async function loadConfig(filepath: string) {
  return explorer.load(filepath)
}

function formatZodError(error: ZodError) {
  return `${heading.red('Error:')} Config validation has failed.
  \n${heading.cyan('Issues:')}
  \n${error.issues
    .map(issue =>
      bullet(`${kleur.yellow(issue.path.join('.') + ':')} ${issue.message}`)
    )
    .join('\n')}\n`
}

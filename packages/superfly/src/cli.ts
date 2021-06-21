import sade, { Handler } from 'sade'
import path from 'path'
import build from './cli/commands/build'
import dev from './cli/commands/dev'
import start from './cli/commands/start'
import { resolveConfig } from './config'

export type GlobalArgs = {
  config?: string
}

const program = sade('superfly')
const defaultPort = process.env.PORT || 3000

program
  .version('0.0.0')
  .option('-c, --config', 'Provide path to custom config.')

program
  .command('dev')
  .describe('Start development server.')
  .option('-p, --port', 'The port to listen on.', defaultPort)
  .action(handlerWithConfig(dev))

program
  .command('build')
  .describe('Build project for production ready deployment.')
  .action(handlerWithConfig(build))

program
  .command('start')
  .describe('Start production server.')
  .option('-p, --port', 'The port to listen on.', defaultPort)
  .action(handlerWithConfig(start))

function handlerWithConfig(handler: Handler) {
  const wrappedHandler: Handler = async ({ config, ...args }: GlobalArgs) => {
    const configFilepath = config && path.resolve(process.cwd(), config)
    const resolvedConfigResult = await resolveConfig(
      process.cwd(),
      configFilepath
    )

    const resolvedConfig = resolvedConfigResult?.config

    return handler(args, resolvedConfig)
  }

  return wrappedHandler
}

program.parse(process.argv, {
  unknown(flag: string) {
    console.error(`Unknown flag provided: ${flag}`)
  }
})

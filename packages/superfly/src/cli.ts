import sade, { Handler } from 'sade'
import build from './cli/commands/build'
import dev from './cli/commands/dev'
import start from './cli/commands/start'
import { loadConfig } from './config'

const program = sade('superfly')

program.version('0.0.0')

program
  .command('dev')
  .describe('Start the development server.')
  .action(withConfig(dev))

program
  .command('build')
  .describe('Build the project for production ready deployment.')
  .option('--sourcemaps', 'Output sourcemaps.', false)
  .action(withConfig(build))

program
  .command('start')
  .describe('Start the production server.')
  .action(withConfig(start))

function withConfig(handler: Handler) {
  const wrappedHandler: Handler = async args => {
    const config = await loadConfig()
    return handler(config)
  }

  return wrappedHandler
}

program.parse(process.argv)

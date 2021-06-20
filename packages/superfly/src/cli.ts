// #!/usr/bin/env node
import sade from 'sade'
import build from './cli/commands/build'
import dev from './cli/commands/dev'
import start from './cli/commands/start'

const program = sade('superfly')

program.version('1.0.0')

program
  .command('dev')
  .describe('Start the development server.')
  .action(dev)

program
  .command('build')
  .describe('Build the project for production ready deployment.')
  .option('--sourcemaps', 'Output sourcemaps.', false)
  .action(build)

program
  .command('start')
  .describe('Start the production server.')
  .action(start)

program.parse(process.argv)

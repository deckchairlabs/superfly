import { createViteConfig } from '@deckchairlabs/vite-plugin-superfly'
import { Handler } from 'sade'
import * as vite from 'vite'

type BuildArgs = {
  sourcemaps?: boolean
}

const build: Handler = async (args: BuildArgs) => {
  const config = createViteConfig(process.cwd())
  const ssrConfig = createViteConfig(process.cwd(), true)

  await vite.build(config)
  await vite.build(ssrConfig)
}

export default build

import * as vite from 'vite'

export default async function createViteDevServer(config: vite.InlineConfig) {
  return vite.createServer(config)
}

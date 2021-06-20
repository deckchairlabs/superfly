import * as vite from 'vite'
import superfly from '@deckchairlabs/vite-plugin-superfly'

export default async function createViteDevServer(root: string) {
  const config = createViteConfig(root)
  const viteDevServer = await vite.createServer(config)

  return viteDevServer
}

export function createViteConfig(
  root: string,
  isSSR?: boolean
): vite.InlineConfig {
  return {
    root,
    configFile: false,
    plugins: [superfly()],
    server: { middlewareMode: true },
    clearScreen: false,
    build: {
      ssr: isSSR,
      sourcemap: true,
      minify: 'esbuild'
    }
  }
}

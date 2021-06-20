import * as vite from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import ssr from 'vite-plugin-ssr/plugin'
import reactJsx from 'vite-react-jsx'
import superfly from '@flyweight/vite-plugin-superfly'

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
    plugins: [reactRefresh(), reactJsx(), superfly(), ssr()],
    server: { middlewareMode: true },
    clearScreen: false,
    build: {
      ssr: isSSR,
      sourcemap: true,
      minify: 'esbuild'
    }
  }
}

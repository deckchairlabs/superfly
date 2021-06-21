import { InlineConfig, Plugin, ViteDevServer } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import ssr from 'vite-plugin-ssr/plugin'
import { createPageRender } from 'vite-plugin-ssr'
import reactJsx from 'vite-react-jsx'
import superfly from './plugin'

export default function plugin(): Plugin[] {
  return [reactRefresh(), reactJsx(), superfly(), ...ssr()]
}

type CreateRendererOptions = {
  viteDevServer?: ViteDevServer
  isProduction?: boolean
  root?: string
}

export function createRenderer(options: CreateRendererOptions) {
  return createPageRender(options)
}

export function createViteConfig(root: string, isSSR?: boolean): InlineConfig {
  return {
    root,
    configFile: false,
    plugins: [plugin()],
    server: { middlewareMode: true },
    clearScreen: false,
    build: {
      ssr: isSSR,
      sourcemap: true,
      minify: 'esbuild'
    }
  }
}

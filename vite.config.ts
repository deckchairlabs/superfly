import reactRefresh from '@vitejs/plugin-react-refresh'
import { UserConfig } from 'vite'
import mdx from 'vite-plugin-mdx'
import ssr from 'vite-plugin-ssr/plugin'
import reactJsx from 'vite-react-jsx'
import { superfly } from './plugin/superfly'

const config: UserConfig = {
  plugins: [reactRefresh(), reactJsx(), mdx(), superfly(), ssr()],
  optimizeDeps: {
    include: ['@mdx-js/react'],
  },
  clearScreen: false,
  build: {
    sourcemap: true,
    minify: 'esbuild',
  },
}

export default config

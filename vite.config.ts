import reactRefresh from '@vitejs/plugin-react-refresh'
import reactJsx from 'vite-react-jsx'
import mdx from 'vite-plugin-mdx'
import ssr from 'vite-plugin-ssr/plugin'
import { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [reactRefresh(), reactJsx(), mdx(), ssr()],
  optimizeDeps: { include: ['@mdx-js/react'] },
  clearScreen: false,
  build: {
    sourcemap: true,
  },
}

export default config

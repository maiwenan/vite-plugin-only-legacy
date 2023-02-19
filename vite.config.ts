import { resolve } from 'path'
import { ConfigEnv, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import onlyLegacy from './src/index'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const isLib = mode === 'library'

  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'OnlyLegacy',
        formats: ['cjs', 'es'],
        fileName: 'index',
      },
      rollupOptions: {
        external: ['rehype', 'unist-util-visit', 'hast-util-has-property'],
      },
    },
    plugins: isLib ? [] : [
      react(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      onlyLegacy()
    ],
  }
}

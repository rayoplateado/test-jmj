import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    globals: true,
    environment: 'jsdom',
    threads: false,
    setupFiles: ['./vitest.setup.js', './src/utils/tests/dataTestIdPlugin.ts'],
  },
})

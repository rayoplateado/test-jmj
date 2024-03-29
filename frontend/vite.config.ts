import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import {fileURLToPath, URL} from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader({svgo: false})],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

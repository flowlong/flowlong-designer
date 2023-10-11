import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import { resolve } from 'path'

const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteCommonjs()],
  resolve: {
    alias: {
      '@': pathResolve('src')
    }
  }
})

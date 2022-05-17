import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    uni(),
    // Vue({
    //   reactivityTransform: true,
    // }),
    // see unocss.config.ts for config
    Unocss(),
  ],
})

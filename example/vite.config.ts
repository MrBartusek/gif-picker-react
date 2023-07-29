import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/gif-picker-react',
  css: {
    postcss: {} // Disable Post CSS
  }
})
